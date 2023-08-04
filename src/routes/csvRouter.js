import express from "express";
import upload from "../utils/multerConfig.js";
import { uploadCsvHandler } from "../controllers/csvController.js";
const csvRouter = new express.Router();

csvRouter.route("/upload").post(
  (req, res, next) => {
    if (!req.body.csv) {
      return res.status(400).send({
        status: false,
        message: "invalid request",
      });
    }
    next();
  },
  upload.single("csv"),
  uploadCsvHandler
);

export default csvRouter;
