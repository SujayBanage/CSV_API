import { Router } from "express";

const transactionsRouter = new Router();

transactionsRouter.route("/").get().post().path().delete();
transactionsRouter.route("/:_id").get().patch().delete();

export default transactionsRouter;
