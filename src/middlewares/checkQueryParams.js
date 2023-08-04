import Transaction from "../models/Transaction.model.js";
export default async function (req, res, next) {
  try {
    console.log("req.query : ", req.query);
    const validQueryParams = [
      "sort",
      "limit",
      "page",
      "Date",
      "Amount",
      "Description",
      "Currecny",
    ];
    const queryParams = Object.keys(req.query);
    if (queryParams.length !== 0) {
      let valid = false;
      for (let i = 0; i < queryParams.length; i++) {
        if (validQueryParams.includes(queryParams[i])) {
          valid = true;
        } else {
          valid = false;
          break;
        }
      }
      if (valid === false) {
        return res.status(400).send({
          status: false,
          message: "query params are not valid",
        });
      }

      if (req.query.Date) {
        const dateValues = Object.values(req.query.Date);

        let validDate = false;

        for (let i = 0; i < dateValues.length; i++) {
          if (
            dateValues[i].match(
              /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
            ) !== null
          ) {
            validDate = true;
          } else {
            validDate = false;
            break;
          }
        }
        if (validDate === false) {
          return res.status(400).send({
            status: false,
            message: "Invalid Date format!",
          });
        }
      }
    }

    const docs = await Transaction.countDocuments();
    if (req.query.limit) {
      if (req.query.limit <= 0 || req.query.limit > docs) {
        return res.status(400).send({
          status: false,
          message: "invalid limit value!",
        });
      }
    }
    const skip = (req.query.page - 1) * req.query.limit;
    if (req.query.page) {
      if (req.query.page > docs || skip > docs || req.query.page <= 0) {
        return res.status(400).send({
          status: false,
          message: "invalid page value!",
        });
      }
    }

    if (req.query.sort) {
      const fields = [
        "Date",
        "-Date",
        "Description",
        "Amount",
        "-Amount",
        "Currency",
        "-Currecny",
      ];

      console.log(req.query.sort.split(","));

      const queryFields = req.query.sort.split(",");

      let flag = false;

      for (let i = 0; i < queryFields.length; i++) {
        if (fields.includes(queryFields[i])) {
          flag = true;
        }
      }

      if (flag === false) {
        return res.status(400).send({
          status: false,
          message: "sort fields are not valid",
        });
      }
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 500,
      message: "Internal Server Error!",
    });
  }
}
