import { Request, Response } from "express";
import { UserController } from "../controllers/UserController";

export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!" });
    });

    app.route("/user/:id").get(this.userController.getUserById);

    app.route("/user/email/:email").get(this.userController.getUserbyEmail);

    app.route("/user").post(this.userController.addNewUser);

    app.route("/user/:id").put(this.userController.updateUser);
  }
}
