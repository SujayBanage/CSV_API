import {
  getTransactionById,
  insertTransaction,
  updateTransactionById,
  deleteTransactionById,
  updateTransactions,
  deleteTransactions,
  findAllTransactions,
  limit,
  sortTransaction,
} from "../services/transaction.service.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllTransactions = catchAsync(async function (req, res) {
  let queryObj = { ...req.query };

  console.log("query obj is :", queryObj);

  const excludeOptions = ["sort", "limit", "page"];
  excludeOptions.forEach((option) => delete queryObj[option]);

  let queryStr = JSON.stringify(queryObj);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  console.log("obj:", JSON.parse(queryStr));

  let transactionCursor = findAllTransactions(JSON.parse(queryStr));

  // * limit
  if (req.query.limit) {
    transactionCursor = limit(
      transactionCursor,
      req.query.limit || 10,
      req.query.page || 1
    );
  }

  // * sort
  if (req.query.sort) {
    transactionCursor = sortTransaction(
      transactionCursor,
      req.query.sort.split(",").join(" ")
    );
  }

  const transactions = await transactionCursor.find(JSON.parse(queryStr));

  if (!transactions) {
    return res.status(500).send({
      status: false,
      message: "internal server error!",
    });
  }

  if (transactions.length <= 0) {
    return res.status(404).send({
      status: false,
      message: "transactions not found!",
    });
  }

  return res.status(200).send({
    status: true,
    transactions,
  });
});

// * specific transaction handlers
export const getSpecificTransactionHandler = catchAsync(async function (
  req,
  res
) {
  const result = await getTransactionById(req.params._id);
  if (!result) {
    return res.status(500).send({
      status: false,
      message: "Internal server error!",
    });
  }

  return res.status(200).send({
    status: true,
    transaction: result,
  });
});

export const updateSpecificTransactionHandler = catchAsync(async function (
  req,
  res
) {
  const update = req.body.update;

  if (!update) {
    return res.status(400).send({
      status: false,
      message: "provide update info!",
    });
  }

  const result = await updateTransactionById({
    _id: req.params._id,
    updateObj: update,
  });

  if (!result) {
    return res.status(500).send({
      status: false,
      message: "Internal Server Error!",
    });
  }

  return res.status(200).send({
    status: true,
    message: "transaction updated!",
    result,
  });
});

export const deleteSpecificTransactionHandler = catchAsync(async function (
  req,
  res
) {
  const result = await deleteTransactionById(req.params._id);

  if (!result) {
    return res.status(500).send({
      status: false,
      message: "Internal server error!",
    });
  }

  return res.status(200).send({
    status: true,
    message: "Transaction deleted!",
    result,
  });
});

export const insertTransactionHandler = catchAsync(async function (req, res) {
  const insertQuery = req.body.insert;
  if (!insertQuery) {
    return res.status(400).send({
      status: false,
      message: "provide insert info!",
    });
  }
  const result = await insertTransaction(insertQuery);

  if (!result) {
    return res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
  return res.status(200).send({
    status: true,
    message: "transactions inserted!",
    result,
  });
});

export const updateMultipleTransations = catchAsync(async function (req, res) {
  const filter = req.body.filter;
  const update = req.body.update;

  if (!filter || !update) {
    return res.status(400).send({
      status: false,
      message: "provide filter and update",
    });
  }

  const result = await updateTransactions(filter, update);

  if (!result) {
    return res.status(500).send({
      status: false,
      message: "Internal server error!",
    });
  }
  return res.status(200).send({
    status: true,
    message: "updated transactions!",
    result,
  });
});

export const deleteMultipleTransations = catchAsync(async function (req, res) {
  const filter = req.body.filter;

  if (!filter) {
    return res.status(400).send({
      status: false,
      message: "provide filter doc!",
    });
  }
  const result = await deleteTransactions(filter);
  if (!result) {
    return res.status(500).send({
      status: false,
      message: "Internal server error!",
    });
  }
  return res.status(200).send({
    status: true,
    message: "deleted transactions!",
    result,
  });
});
