import dotenv from "dotenv";
dotenv.config({
  path: "config.env",
});

export default {
  EXCHANGE_API_KEY: process.env.EXCHANGE_API_KEY,
  EXCHANGE_API_URL: process.env.EXCHANGE_API_URL,
  PORT: process.env.PORT,
  MONGO_URI:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URI_DEV
      : process.env.MONGODB_URI_PROD,
};
