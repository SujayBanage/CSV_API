export default function updateAndDeleteSchemaValidation(req, res, next) {
  if (req.body.filter) {
    if (!validateKeys(req.body.filter)) {
      return res.status(400).send({
        status: false,
        message: "Invalid filter object",
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
