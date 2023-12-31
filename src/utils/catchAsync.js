export default function (controller) {
  return async function (req, res, next) {
    try {
      await controller(req, res, next);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        return res.status(500).send({
          status: false,
          message: err.message,
        });
      } else {
        return res.status(500).send({
          status: false,
          message: "Internal Server Error!",
        });
      }
    }
  };
}
