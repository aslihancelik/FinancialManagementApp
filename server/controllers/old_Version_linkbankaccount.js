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
