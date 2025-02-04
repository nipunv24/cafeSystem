import express from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/add-transaction", addTransaction); // ✅ Save transaction
router.get("/transactions", getTransactions); // ✅ Get all transactions

export default router;
