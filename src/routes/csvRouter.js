import express from "express";
import upload from "../utils/multerConfig.js";
import { uploadCsvHandler } from "../controllers/csvController.js";
const csvRouter = new express.Router();

csvRouter.route("/csv/upload").post(upload.single("csv"), uploadCsvHandler);

export default csvRouter;
