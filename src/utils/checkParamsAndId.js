import { isValidObjectId } from "mongoose";
export default function (req) {
  console.log("params are : ", req.params);
  if (!req.params._id) {
    return {
      status: false,
      message: "_id is missing",
    };
  }
  const _id = req.params._id;
  if (!isValidObjectId(_id)) {
    return {
      status: false,
      message: "_id is invalid",
    };
  }
  return {
    status: true,
    message: "",
  };
}
