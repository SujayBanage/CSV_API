import mongoose from "mongoose";
import config from "../../config/index.js";
async function connection() {
  console.log("uri is : ", config.MONGO_URI);
  const mongoConnection = await mongoose.connect(config.MONGO_URI);
  return mongoConnection;
}
export default connection;
