const Account = require("../models/account_models");

//Utility Function to Mask Numbers
const maskNumber = (last4) => "****" + last4; // Keep last 4 digits visible

// Get all accounts for a user
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });

    // Mask sensitive fields before sending the response
    const maskedAccounts = accounts.map((account) => ({
      ...account._doc,
      bankAccount: account.bankAccount
        ? {
            ...account.bankAccount,
            accountNumber: maskNumber(account.bankAccount.last4Account), // Masked account number
            routingNumber: maskNumber(account.bankAccount.last4Routing), // Masked routing number
          }
        : undefined,
      creditCard: account.creditCard
        ? {
            ...account.creditCard,
            number: maskNumber(account.creditCard.last4), // Masked credit card number
          }
        : undefined,
    }));

    res.status(200).json(maskedAccounts);

    // res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Link an existing account
exports.linkAccount = async (req, res) => {
  const { name, type, balance, creditCard, bankAccount } = req.body;

  try {
    const newAccount = new Account({
      user: req.user.id,
      name,
      type,
      balance,
      // creditCard: type === 'credit card' ? creditCard : undefined,
      // bankAccount: type === 'bank account' ? bankAccount : undefined,
      creditCard:
        type === "credit card"
          ? {
              ...creditCard,
              last4: creditCard.number.slice(-4), // Extract last 4 digits
            }
          : undefined,
      bankAccount:
        type === "bank account"
          ? {
              ...bankAccount,
              last4Account: bankAccount.accountNumber.slice(-4), // Extract last 4 digits of account number
              last4Routing: bankAccount.routingNumber.slice(-4), // Extract last 4 digits of routing number
            }
          : undefined,
    });

    await newAccount.save();

    // Return masked data in the response
    const maskedAccount = {
      ...newAccount._doc,
      bankAccount: newAccount.bankAccount
        ? {
            ...newAccount.bankAccount,
            accountNumber: maskNumber(newAccount.bankAccount.last4Account),
            routingNumber: maskNumber(newAccount.bankAccount.last4Routing),
          }
        : undefined,
      creditCard: newAccount.creditCard
        ? {
            ...newAccount.creditCard,
            number: maskNumber(newAccount.creditCard.last4),
          }
        : undefined,
    };

    res.status(201).json(maskedAccount);

    // res.status(201).json(newAccount);
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

    // Mask sensitive data
    const maskedAccount = {
      ...account._doc,
      bankAccount: account.bankAccount
        ? {
            ...account.bankAccount,
            accountNumber: maskNumber(account.bankAccount.last4Account),
            routingNumber: maskNumber(account.bankAccount.last4Routing),
          }
        : undefined,
      creditCard: account.creditCard
        ? {
            ...account.creditCard,
            number: maskNumber(account.creditCard.last4),
          }
        : undefined,
    };

    res.status(200).json(maskedAccount);

    // res.status(200).json(account);
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
      return res.status(404).json({ message: 'Account not found' });
    }

    account.name = name || account.name;
    account.balance = balance !== undefined ? balance : account.balance;

    // Update credit card details if provided
    if (account.type === "credit card") {
      account.creditCard.number = creditCard.number || account.creditCard.number;
      account.creditCard.cvc = creditCard.cvc || account.creditCard.cvc;
      account.creditCard.expDate = creditCard.expDate || account.creditCard.expDate;
    }

    // Update bank account details if provided
    if (account.type === 'bank account') {
      account.bankAccount.routingNumber = bankAccount.routingNumber || account.bankAccount.routingNumber;
      account.bankAccount.accountNumber = bankAccount.accountNumber || account.bankAccount.accountNumber;
    }
    await account.save();
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// // Get balance for an account
// exports.getBalance = async (req, res) => {
//   try {
//     // Find the account by ID
//     const account = await Account.findById(req.params.id);

//     // Check if account exists and belongs to the authenticated user
//     if (!account || account.user.toString() !== req.user.id) {
//       return res.status(404).json({ message: "Account not found" });
//     }

//     // Respond with the account balance
//     res.status(200).json({ balance: account.balance });
//   } catch (error) {
//     console.error("Error fetching account balance:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };