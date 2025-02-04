import Transaction from "../models/transactionModel.js";

// ✅ Save a new transaction
const addTransaction = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required and must be an array" });
    }

    // Calculate total amount
    let totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Create transaction object
    const newTransaction = new Transaction({
      items: items.map(item => ({
        category: item.category,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      })),
      totalAmount
    });

    await newTransaction.save();
    res.status(201).json({ success: true, message: "Transaction saved successfully" });

  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ success: false, message: "Error saving transaction" });
  }
};

// ✅ Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions" });
  }
};

export { addTransaction, getTransactions };
