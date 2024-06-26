import Express from "./Express";
import dotenv from "dotenv";
import { Database } from "./Database";
import { processEmail } from "../jobs/emailProcessor";
dotenv.config();

class App {

  public loadServer(): void {
    console.log('Server :: Loading...');
    Express.init();
  }
  public loadDatabase(): void {
    console.info('Database :: Loading...');
    Database.init();
  }
  public loadJob(): void {
    console.log("Job :: Loading...");
    setInterval(processEmail, 10000);
  }

}

export default new App;