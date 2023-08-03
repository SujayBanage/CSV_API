import express from "express";
import config from "../config/index.js";
import connection from "./utils/databaseConnection.js";
import csvRouter from "./routes/csvRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";

const app = express();

const port = config.PORT || 5000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/csv", csvRouter);
app.use("/api/transactions", transactionsRouter);

function serverInit() {
  connection()
    .then((mongoConnection) => {
      console.log("connected to DB!");
      app.listen(port, () => {
        console.log(`listening on port : ${port}`);
      });
    })
    .catch((err) => {
      console.log(`err is : ${err.message}`);
      process.exit();
    });
}

serverInit();
