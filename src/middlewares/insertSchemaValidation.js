import transactionSchema from "../schema/transaction.schema.js";
export default function (req, res, next) {
  const insert = req.body.insert;
  try {
    if (!insert) {
      return res.status(400).send({
        status: false,
        message: "invalid insert request",
      });
    }
    if (Array.isArray(insert)) {
      let valid = false;
      for (let i = 0; i < insert.length; i++) {
        if (
          transactionSchema.parse(insert[i]) &&
          insert[i].Date.match(
            /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
          ) !== null
        ) {
          valid = true;
        } else {
          valid = false;
          break;
        }
      }
      if (valid === false) {
        return res.status(400).send({
          status: false,
          message: "type validation failed!",
        });
      }
    } else {
      if (
        !transactionSchema.parse(insert) ||
        insert.Date.match(
          /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
        ) === null
      ) {
        return res.status(400).send({
          status: false,
          message: "type validation failed!",
        });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      status: false,
      message: err.message,
    });
  }
}
