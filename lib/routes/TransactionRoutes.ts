import { TransactionController } from "../controllers/TrasactionController";

export class TransactionRoutes {
    public transactionController: TransactionController = new TransactionController();

    public routes(app): void {
       
        app.route("/transaction").post(this.transactionController.addNewTransaction);

        // Get transactions for given year and month, by userId...
        app.route("/transaction/:year/:month").get(this.transactionController.getTransaction);

        // Get transactions running balance for a specific user...
        app.route("/transaction/balance/:year/:month").get(this.transactionController.getTransactionBalance);

    }

    
}