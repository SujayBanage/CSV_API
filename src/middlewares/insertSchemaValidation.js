import transactionSchema from "../schema/transaction.schema.js";
export default function (req, res, next) {
  const insert = req.body.insert;
  if (!insert) {
    return res.status(400).send({
      status: false,
      message: "invalid insert request",
    });
  }
  if (Array.isArray(insert)) {
    let valid = false;
    for (let i = 0; i < insert.length; i++) {
      if (transactionSchema.parse(insert[i])) {
        valid = true;
      } else {
        valid = false;
        break;
      }
    }
    if (valid === false) {
      return res.status(400).send({
        status: false,
        message: "invalid insert object!",
      });
    }
  } else {
    if (!transactionSchema.parse(insert)) {
      if (valid === false) {
        return res.status(400).send({
          status: false,
          message: "invalid insert object!",
        });
      }
    }
  }
  next();
}
