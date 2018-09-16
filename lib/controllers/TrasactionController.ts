import * as mongoose from "mongoose";
import { TransactionModel } from "../models/TransactionModel";
import { Request, Response } from "express";

const Transaction = mongoose.model("Transaction", TransactionModel);

export class TransactionController {
  public addNewTransaction(req: Request, res: Response) {
    let newTransaction = new Transaction(req.body);
    newTransaction.save((err, newTransaction) => {
      if (err) {
        res.send(err);
        return console.log(err);
      }
      res.status(200).json(newTransaction);
    });
  }

  public getTransaction(req: Request, res: Response) {
    const userId = req.get("userId");
    const year: number = req.params.year;
    const month: number = req.params.month - 1; // JS months are zero-based
    const startDt: Date = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    const endDt: Date = new Date(Date.UTC(year, month + 1, 1, 0, 0, 0));
    const qry = {
      userId: userId,
      transactionDate: {
        $gte: startDt,
        $lt: endDt
      }
    };

    Transaction.find(qry)
      .sort({ transactionDate: 1 })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: "Error finding transactions for user",
          error: err
        })
      );
  }

  public getTransactionBalance(req: Request, res: Response) {
    const userId = req.get("userId");
    const year: number = req.params.year;
    const month: number = req.params.month - 1; // JS months are zero-based
    const endDt: Date = new Date(Date.UTC(year, month, 1));
    const pipeline = [
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId)
        }
      },
      {
        $match: {
          transactionDate: { $lt: endDt }
        }
      },
      {
        $group: {
          _id: null,
          charges: { $sum: "$charge" },
          deposits: { $sum: "$deposit" }
        }
      }
    ];

    Transaction.aggregate(pipeline)
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: "Error finding transactions for user",
          error: err
        })
      );
  }
}
