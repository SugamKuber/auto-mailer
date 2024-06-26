import dotenv from "dotenv";
import express from "express";
import http from "http";
import Kernel from "../middlewares/Kernel";
import Routes from "./Routes";
import passport from "passport";
import session from "express-session";

dotenv.config();

class Express {
  public express: express.Application;
  private server: http.Server;

  constructor() {
    this.express = express();
    this.createServer();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  public init(): void {
    const port = process.env.PORT || 8080;
    this.express.use((req, res) => {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    });
    this.server.listen(port, () => {
      console.log(`Server :: Running on port ${port}`);
    });
  }

  private mountRoutes(): void {
    this.express = Routes.mount(this.express);
  }

  private mountMiddlewares(): void {
    this.express.use(session({
      secret: 'sample',
      resave: false,
      saveUninitialized: false,
    }));
    
    this.express.use(passport.session());

    this.express = Kernel.init(this.express);
  }

  private createServer(): void {
    this.server = http.createServer(this.express);
  }

}

export default new Express();
