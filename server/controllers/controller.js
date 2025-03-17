const Account = require("../models/account_models");
const plaidClient = require("../plaidConfig");   // Import the plaidClient configuration


// Generate a new Plaid link token
exports.createLinkToken = async (req, res) => {
  try {
    const response = await plaidClient.linkToken.create({
      user: { client_user_id: req.user.id }, // unique user ID from your app
      client_name: "Your App Name", // The name of your app
      products: ["auth", "transactions"], // Products you're using from Plaid
      country_codes: ["US"], // Country code (can be different depending on where you operate)
      language: "en", // Language of the UI (e.g., English)
    });

    // Send the link token back to the client
    res.json({ link_token: response.link_token });
  } catch (error) {
    console.error("Error creating link token:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Link an existing account
exports.linkAccount = async (req, res) => {
  const { name, type, balance, creditCard, bankAccount, publicToken } = req.body;

  try {
    // Exchange the public token from front-end for an access token using Plaid API
    const response = await plaidClient.linkToken.exchange({
      public_token: publicToken,
    });

    const accessToken = response.access_token; //token used to make further API requests 
    const itemId = response.item_id; //A unique identifier for the account link between your app and Plaid.

    // Now, create the account with Plaid details
    const newAccount = new Account({
      user: req.user.id,
      name,
      type,
      balance,
      plaid: {
        accessToken,
        itemId,
      },
      creditCard: type === "credit card" ? creditCard : undefined,
      bankAccount: type === "bank account" ? bankAccount : undefined,
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    console.error("Error linking account:", error);
    res.status(500).json({ message: "Server error" });
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
      return res.status(404).json({ message: 'Account not found' });
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
      return res.status(404).json({ message: 'Account not found' });
    }

    account.name = name || account.name;
    account.type = type || account.type;
    account.balance = balance !== undefined ? balance : account.balance;
    account.creditCard = type === 'credit card' ? creditCard : account.creditCard;
    account.bankAccount = type === 'bank account' ? bankAccount : account.bankAccount;

    await account.save();
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};