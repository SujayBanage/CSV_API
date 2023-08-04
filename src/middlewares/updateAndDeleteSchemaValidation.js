export default function updateAndDeleteSchemaValidation(req, res, next) {
  if (req.body.filter) {
    if (!validateKeys(req.body.filter)) {
      return res.status(400).send({
        status: false,
        message: "Invalid filter object",
      });
    }
    if (!validateDate(req.body.filter)) {
      return res.status(400).send({
        status: false,
        message: "Invalid Date format",
      });
    }
  }

  if (req.body.update) {
    if (!validateKeys(req.body.update)) {
      return res.status(400).send({
        status: false,
        message: "Invalid update object",
      });
    }
    if (!validateDate(req.body.update)) {
      return res.status(400).send({
        status: false,
        message: "Invalid Date format",
      });
    }
  }
  next();
}

function validateKeys(obj) {
  const fields = ["Amount", "Description", "Currecny", "Date"];
  const keys = Object.keys(obj);
  let valid = false;
  for (let i = 0; i < keys.length; i++) {
    if (fields.includes(keys[i])) {
      valid = true;
    } else {
      valid = false;
      break;
    }
  }
  return valid;
}

function validateDate(obj) {
  if (
    obj.Date.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/) === null
  ) {
    return false;
  }
  return true;
}
