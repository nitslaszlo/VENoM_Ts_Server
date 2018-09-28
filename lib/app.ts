import * as express from "express";
import * as bodyParser from "body-parser";
import { TransactionRoutes } from "./routes/TransactionRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import * as mongoose from "mongoose";
import { CorsOptions } from "cors";

class App {
  public app: express.Application;
  public routeTranactions: TransactionRoutes = new TransactionRoutes();
  public routeUsers: UserRoutes = new UserRoutes();
  // public mongoUrl: string = "mongodb://localhost/CRMdb";
  public mongoUrl: string =
    "mongodb://nits:Abc123456@localhost:27017/globomantics";

  constructor() {
    this.app = express();
    this.config();
    this.routeTranactions.routes(this.app);
    this.routeUsers.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    var corsOptions: CorsOptions = {
      origin: '*',
      credentials: true,
      allowedHeaders: '*',
      // allowedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin', 'Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept',  'Access-Control-Request-Method', 'Access-Control-Request-Headers'],
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  var cors = require("cors");
  this.app.use(cors(corsOptions));

  
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      this.mongoUrl,
      { useNewUrlParser: true }
    );
  }
}

export default new App().app;
