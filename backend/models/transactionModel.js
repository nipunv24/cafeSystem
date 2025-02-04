import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now }, // Auto-set current date
    items: [
      {
        category: { type: String, required: true }, // Category of the product
        name: { type: String, required: true }, // Product name
        price: { type: Number, required: true }, // Product price
        quantity: { type: Number, required: true }, // Quantity purchased
        subtotal: { type: Number, required: true } // subtotal = price * quantity
      }
    ],
    totalAmount: { type: Number, required: true } // Sum of all subtotals
  },
  { versionKey: false }
);

const Transaction = mongoose.model("Transaction", TransactionSchema, "Transactions");
export default Transaction;
