import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserModel = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now }
});
