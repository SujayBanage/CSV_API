import { string, date, number, object } from "valibot";
const transactionSchema = object({
  Date: date(),
  Description: string(),
  Currency: string(),
  Amount: number(),
});

export default transactionSchema;
