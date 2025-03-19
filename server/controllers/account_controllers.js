const bcrypt = require("bcrypt");
const Account = require("../models/account_models");
const plaidClient = require("../plaidConfig"); // Import the plaidClient configuration
const { encrypt } = require("../utils/encryption");

// Generate a new Plaid link token
exports.createLinkToken = async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: req.user.id }, // unique user ID from your app
      client_name: process.env.APP_NAME, // The name of your app
      products: ["auth"], // Products you're using from Plaid  ["auth", "transactions"],
      country_codes: ["US"], // Country code (can be different depending on where you operate)
      language: "en", // Language of the UI (e.g., English)
    });

    // Send the link token back to the client
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error("Error creating link token:", error);
    res.status(500).json({
      message: "Server error",
      error: error.response ? error.response.data : error.message,
    });
  }
};

// Link a bank account

exports.linkBankAccount = async (req, res) => {
  const { publicToken } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    // Step 1: Exchange public token for access token
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = tokenResponse.data.access_token;
    const itemId = tokenResponse.data.item_id;

    // Step 2: Fetch account details using Plaid's authGet API
    const authResponse = await plaidClient.authGet({
      access_token: accessToken,
    });

    console.log("Auth Response:", JSON.stringify(authResponse.data, null, 2)); // Debugging log

    // Extract routing and account numbers (ACH info) and list of accounts
    const accountNumbers = authResponse.data.numbers.ach || []; // ACH numbers
    const accounts = authResponse.data.accounts || []; // Accounts list

    if (accounts.length === 0) {
      return res
        .status(400)
        .json({ message: "No accounts found in the response" });
    }

    // Retrieve all existing accounts linked to the user
    const existingAccounts = await Account.find({ user: req.user.id });

    // Step 3: Process each account and save to the database
    const savedAccounts = await Promise.all(
      accounts.map(async (account) => {
        // Find matching routing/account numbers using account_id
        const accountNumberInfo =
          accountNumbers.find((num) => num.account_id === account.account_id) ||
          {};

        // Debug the mapping process
        console.log(`Processing account: ${account.name}`);
        console.log("Matching ACH Info:", accountNumberInfo);

        // Skip if no routing/account number found
        if (!accountNumberInfo.routing || !accountNumberInfo.account) {
          return null;
        }

        // Encrypt routing and account numbers
        const encryptedRoutingNumber = await encrypt(accountNumberInfo.routing);
        const encryptedAccountNumber = await encrypt(accountNumberInfo.account);

        // Check if the hashed account already exists
        const isDuplicate = await Promise.all(
          existingAccounts.map(async (existingAccount) => {
            return (
              existingAccount.bankAccount &&
              (await bcrypt.compare(
                accountNumberInfo.routing,
                existingAccount.bankAccount.routingNumber
              )) &&
              (await bcrypt.compare(
                accountNumberInfo.account,
                existingAccount.bankAccount.accountNumber
              ))
            );
          })
        );

        // If duplicate found, skip saving
        if (isDuplicate.includes(true)) {
          console.log(`Skipping duplicate account: ${account.name}`);
          return null;
        }

        // // Encrypt routing and account numbers
        // const encryptedRoutingNumber = accountNumberInfo.routing
        //   ? await encrypt(accountNumberInfo.routing)
        //   : "N/A";
        // const encryptedAccountNumber = accountNumberInfo.account
        //   ? await encrypt(accountNumberInfo.account)
        //   : "N/A";

        // Create a new bank account document
        const newBankAccount = new Account({
          user: req.user.id,
          name: account.name,
          type: account.subtype || "bank account", // Use Plaid's subtype
          balance: account.balances.current || 0, // Use balance data
          bankAccount: {
            routingNumber: encryptedRoutingNumber,
            accountNumber: encryptedAccountNumber,
          },
          plaid: {
            accessToken,
            itemId,
            accountId: account.account_id, // Save the account_id for reference
          },
        });

        return newBankAccount.save(); // Save the account to the database
      })
    );

    // Step 4: Return a success response with saved accounts
    res.status(201).json({
      message: `${savedAccounts.length} accounts linked successfully`,
      accounts: savedAccounts,
    });
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error("Plaid API Error:", error.response.data);
    } else {
      console.error("Server Error:", error.message);
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// exports.linkBankAccount = async (req, res) => {
//   const { publicToken } = req.body;

//   if (!req.user) {
//     return res.status(401).json({ message: "User not authenticated" });
//   }

//   try {
//     // Step 1: Exchange public token for access token
//     const tokenResponse = await plaidClient.itemPublicTokenExchange({
//       public_token: publicToken,
//     });

//     const accessToken = tokenResponse.data.access_token;
//     const itemId = tokenResponse.data.item_id;

//     // Step 2: Fetch account details using Plaid's authGet API
//     const authResponse = await plaidClient.authGet({
//       access_token: accessToken,
//     });

//     console.log("Auth Response:", authResponse.data); // Log the full auth response for debugging

//     // Extract routing and account numbers (if available)
//     const accountNumbers = authResponse.data.numbers.ach
//       ? authResponse.data.numbers.ach[0]
//       : null;

//     if (!accountNumbers) {
//       return res
//         .status(400)
//         .json({ message: "Routing and account numbers not available" });
//     }

//     // Extract account information from the auth response
//     const accountInfo = authResponse.data.accounts[0];

//     if (!accountInfo) {
//       return res.status(400).json({ message: "No account information found" });
//     }

//     // Step 3: Create and save the account to the database
//     const newBankAccount = new Account({
//       user: req.user.id,
//       name: accountInfo.name,
//       type: accountInfo.subtype || "bank account", // Use Plaid's account subtype
//       balance: accountInfo.balances.current || 0,
//       bankAccount: {
//         routingNumber: accountNumbers.routing,
//         accountNumber: accountNumbers.account,
//       },
//       plaid: {
//         accessToken,
//         itemId,
//       },
//     });

//     await newBankAccount.save();
//     res.status(201).json(newBankAccount);
//   } catch (error) {
//     // Improved error handling for Plaid API or other server errors
//     if (error.response) {
//       console.error("Plaid API Error:", error.response.data);
//     } else {
//       console.error("Server Error:", error.message);
//     }
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// exports.linkBankAccount = async (req, res) => {
//   const { name, type, balance, bankAccount, publicToken } = req.body;

//   try {
//     // Exchange the public token from front-end for an access token using Plaid API
//     const tokenResponse = await plaidClient.itemPublicTokenExchange({
//       public_token: publicToken,
//     });

//     const accessToken = tokenResponse.data.access_token; //token used to make further API requests
//     const itemId = tokenResponse.data.item_id; //A unique identifier for the account link between your app and Plaid.

//     // Step 2: Validate account using routing and account numbers
//     const authResponse = await plaidClient.authGet({
//       access_token: accessToken,
//     });

//     // Now, create the account with Plaid details
//     const newBankAccount = new Account({
//       user: req.user.id,
//       name,
//       type: "bank account",
//       balance,
//       bankAccount: {
//         routingNumber: bankAccount.routingNumber,
//         accountNumber: bankAccount.accountNumber,
//       },
//       plaid: {
//         accessToken,
//         itemId,
//       },
//     });

//     await newBankAccount.save();
//     res.status(201).json(newBankAccount);
//   } catch (error) {
//     console.error("Error linking account:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Link a credit card
exports.linkCreditCard = async (req, res) => {
  const { name, balance, creditCard, publicToken } = req.body;

  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = tokenResponse.data.access_token;
    const itemId = tokenResponse.data.item_id;

    const newCreditCard = new Account({
      user: req.user.id,
      name,
      type: "credit card",
      balance,
      creditCard: {
        number: creditCard.number,
        expDate: creditCard.expDate,
        cvc: creditCard.cvc,
      },
      plaid: {
        accessToken,
        itemId,
      },
    });

    await newCreditCard.save();
    res.status(201).json(newCreditCard);
  } catch (error) {
    console.error("Error linking credit card:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all accounts for a user
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single account by ID
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    if (!account || account.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing account
exports.updateAccount = async (req, res) => {
  const { name, type, balance, creditCard, bankAccount } = req.body;

  try {
    const account = await Account.findById(req.params.id);

    if (!account || account.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.name = name || account.name;
    account.type = type || account.type;
    account.balance = balance !== undefined ? balance : account.balance;
    account.creditCard =
      type === "credit card" ? creditCard : account.creditCard;
    account.bankAccount =
      type === "bank account" ? bankAccount : account.bankAccount;

    await account.save();
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
