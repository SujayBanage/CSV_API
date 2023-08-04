import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
    validation: {
      validate: function (val) {
        const date = new Date(val);
      },
    },
  },
  Description: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
    min: [1, "Amount should not be less than 1"],
  },
  Currency: {
    type: String,
    required: true,
    default: "INR",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
