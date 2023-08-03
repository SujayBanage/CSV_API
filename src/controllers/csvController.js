import csv from "csvtojson";
import { getRates } from "../utils/currenyConverter.js";
import { bulkInsert } from "../services/transaction.service.js";

export async function uploadCsvHandler(req, res) {
  console.log(req.file);

  if (!req.file) {
    return res.status(404).send({
      status: false,
      message: "File not found!",
    });
  }

  // * csvtojson() way:-
  let transactions = await csv({}).fromFile(req.file.path);

  let currencyMap = new Map();

  // * finding all currencies
  transactions.forEach((obj) => {
    if (!currencyMap.has(obj.Currency) && obj.Currency !== "INR") {
      currencyMap.set(obj.Currency, 1);
    }
  });

  // * currency rates from INR to specific currency:-
  const conversionRatesINRObj = await getRates();

  // * setting conversion rates from currency to INR
  currencyMap.forEach((_, cur) => {
    const rate = conversionRatesINRObj[cur];
    currencyMap.set(cur, rate);
  });

  console.log("final map : ", currencyMap);

  // * transformaing the transactions array
  transactions = transactions.map((transaction) => {
    const rate = currencyMap.get(transaction.Currency);
    const amount =
      parseInt(transaction.Amount) > 0
        ? parseInt(transaction.Amount)
        : -1 * parseInt(transaction.Amount);
    const inr = Math.round(amount / rate);
    const dateArr = transaction.Date.split("-");
    const formattedDate = new Date(
      `${dateArr[dateArr.length - 1]}-${dateArr[1]}-${dateArr[0]}`
    );
    return {
      Description: transaction.Description,
      Date: formattedDate,
      Amount: inr,
      Currency: "INR",
    };
  });
  // * bulk insert into DB
  const isInserted = await bulkInsert(transactions);

  if (!isInserted) {
    return res.status(500).send({
      status: false,
      message: "CSV upload failed!",
    });
  }

  return res.status(200).send({
    status: true,
    message: "csv upload successfull!",
  });
}
