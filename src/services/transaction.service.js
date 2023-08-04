import Transaction from "../models/Transaction.model.js";
export async function bulkInsert(itemsArray) {
  const existsAlready = await Transaction.find();

  if (existsAlready.length > 0) {
    await Transaction.deleteMany();
  }

  // * bulk operation initialization
  const bulk = Transaction.collection.initializeOrderedBulkOp();
  // * adding operations to bulk
  itemsArray.forEach((transaction) => {
    bulk.insert(transaction);
  });
  // * executing bulk operation
  const results = await bulk.execute();
  console.log("bulk insert result!", results);
  const transactionsData = await Transaction.find();
  if (transactionsData.length <= 0 || !results) {
    return false;
  }
  return true;
}

export function findAllTransactions(filterQuery) {
  return Transaction.find(filterQuery);
}

export function sortTransaction(transactionCursor, sortField) {
  return transactionCursor.sort(sortField);
}

export function limit(transactionCursor, limit, page) {
  if (page) {
    const skip = (page - 1) * limit;
    return transactionCursor.skip(skip).limit(limit);
  }
  return transactionCursor.limit(limit);
}

export async function insertTransaction(insertQuery) {
  if (Array.isArray(insertQuery)) {
    const res = await Transaction.insertMany(insertQuery);
    return res;
  }
  const res = await Transaction.create(insertQuery);
  return res;
}

export async function getTransactionById(_id) {
  const res = await Transaction.findById({ _id });
  return res;
}

export async function deleteTransactionById(_id) {
  const res = await Transaction.findOneAndDelete({ _id });
  return res;
}

export async function updateTransactionById({ _id, updateObj }) {
  if (updateObj.Date) {
    updateObj.Date = new Date(updateObj.Date);
  }
  const res = await Transaction.findOneAndUpdate(
    { _id },
    { $set: { ...updateObj } },
    {
      new: true,
    }
  );
  return res;
}

export async function updateTransactions(filterQuery, updateQuery) {
  if (updateQuery.Date) {
    updateQuery.Date = new Date(updateQuery.Date);
  }
  const result = await Transaction.updateMany(filterQuery, {
    $set: { ...updateQuery },
  });
  return result;
}

export async function deleteTransactions(filterQuery) {
  if (filterQuery.Date) {
    filterQuery.Date = new Date(filterQuery.Date);
  }
  const result = await Transaction.deleteMany(filterQuery);
  return result;
}
