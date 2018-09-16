import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TransactionModel = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  transactionDate: { type: Date, required: true },
  transactionType: { type: String, required: true },
  description: { type: String, required: true },
  charge: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 },
  notes: { type: String, default: "" },
  createdOn: { type: Date, default: Date.now }
});
