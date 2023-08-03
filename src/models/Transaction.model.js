import mongoose from "mongoose";
import validator from "validator";
const { isDate } = validator;
const transactionSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return isDate(value, {
          format: "YYYY-MM-DD",
          delimiters: ["-"],
        });
      },
      message: (props) => `${props.value} is not valid date`,
    },
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
