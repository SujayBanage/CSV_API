import { string, number, object } from "valibot";
const transactionSchema = object({
  Date: string(),
  Description: string(),
  Currency: string(),
  Amount: number(),
});

export default transactionSchema;
