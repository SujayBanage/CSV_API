import express from "express";

const csvRouter = new express.Router();

csvRouter.route("/csv").post().get();

export default csvRouter;
