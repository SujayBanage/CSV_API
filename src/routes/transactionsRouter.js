import { Router } from "express";
import {
  getSpecificTransactionHandler,
  deleteSpecificTransactionHandler,
  updateSpecificTransactionHandler,
  insertTransactionHandler,
  deleteMultipleTransations,
  updateMultipleTransations,
  getAllTransactions,
} from "../controllers/transactionController.js";
const transactionsRouter = new Router();

transactionsRouter
  .route("/")
  .get(getAllTransactions)
  .post(insertTransactionHandler)
  .patch(updateMultipleTransations)
  .delete(deleteMultipleTransations);
transactionsRouter
  .route("/:_id")
  .get(getSpecificTransactionHandler)
  .patch(updateSpecificTransactionHandler)
  .delete(deleteSpecificTransactionHandler);

export default transactionsRouter;
