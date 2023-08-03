import Transaction from "../models/Transaction.model.js";
export async function bulkInsert(itemsArray) {
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

export async function insertTransaction(insertQuery) {
  if (Array.isArray(insertQuery)) {
    const res = await Transaction.insertMany(insertQuery);
    if (!res) {
      return false;
    }
    return true;
  }

  const res = await Transaction.insertOne(insertQuery);
  if (!res) {
    return false;
  }
  return true;
}

export async function getTransactionById(_id) {
  const res = await Transaction.findById(_id);
  if (!res) {
    return false;
  }
  return true;
}

export async function deleteTransactionById(_id) {
  const res = await Transaction.findOneAndDelete({ _id });
  if (!res) {
    return false;
  }
  return true;
}

export async function updateTransactionById({ _id, updateObj }) {
  const res = await Transaction.findOneAndUpdate(
    { _id },
    { $set: { updateObj } }
  );
  if (!res) {
    return false;
  }
  return true;
}
