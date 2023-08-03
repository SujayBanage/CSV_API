import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  Date: {
    type: Date,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Amount: {
    type: Number,
    require: true,
  },
  Currency: {
    type: String,
    default: "INR",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
