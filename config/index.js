import dotenv from "dotenv";
dotenv.config({
  path: "config.env",
});

export default {
  PORT: process.env.PORT,
  MONGO_URI:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URI_DEV
      : process.env.MONGODB_URI_PROD,
};
