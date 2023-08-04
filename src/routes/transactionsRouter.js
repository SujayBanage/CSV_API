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
import checkParamsAndId from "../middlewares/checkParamsAndId.js";
import checkQueryParams from "../middlewares/checkQueryParams.js";
import insertSchemaValidation from "../middlewares/insertSchemaValidation.js";
import updateAndDeleteSchemaValidation from "../middlewares/updateAndDeleteSchemaValidation.js";
const transactionsRouter = new Router();

transactionsRouter
  .route("/")
  .get(checkQueryParams, getAllTransactions)
  .post(insertSchemaValidation, insertTransactionHandler)
  .patch(updateAndDeleteSchemaValidation, updateMultipleTransations)
  .delete(updateAndDeleteSchemaValidation, deleteMultipleTransations);
transactionsRouter
  .route("/:_id")
  .get(checkParamsAndId, getSpecificTransactionHandler)
  .patch(checkParamsAndId, updateSpecificTransactionHandler)
  .delete(checkParamsAndId, deleteSpecificTransactionHandler);

export default transactionsRouter;
