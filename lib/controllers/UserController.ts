import * as mongoose from "mongoose";
import { UserModel } from "../models/UserModel";
import { Request, Response } from "express";

const User = mongoose.model("User", UserModel);

export class UserController {
  public getUserById(req: Request, res: Response) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.json(user);
        }
      });
    } else {
      res.send("Wrong user ID!");
      console.log("Wrong user ID!");
    }
  }

  public getUserbyEmail(req: Request, res: Response) {
    User.find({ email: req.params.email })
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: "Error finding user",
          error: err
        })
      );
  }

  public addNewUser(req: Request, res: Response) {
    let user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        res.status(500).json(err);
      } else res.status(200).json(user);
    });
  }

  public updateUser(req: Request, res: Response) {
    let qry = { _id: req.params.id };
    let doc = {
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive
    };
    User.update(qry, doc, function(err, respRaw) {
      if (err) return console.log(err);
      res.status(200).json(respRaw);
    });
  }
}
