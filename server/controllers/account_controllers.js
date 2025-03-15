const Account = require("../models/account_models");
// const mockUser = require("../middleware/mockAuthMiddleware");
// const mockUser = "67d35bc0a50f98b491e7e002";
// Get all accounts for a user
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id });
    res.status(200).json(accounts);
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
      creditCard: type === 'credit card' ? creditCard : undefined,
      bankAccount: type === 'bank account' ? bankAccount : undefined,
    });

    await newAccount.save();
    res.status(201).json(newAccount);
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