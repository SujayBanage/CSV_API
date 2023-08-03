import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Currency: {
    type: String,
    required: true,
    default: "INR",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
