import os from "os";
import { Application } from "express";
import AuthRoute from "../routes/auth";

class Routes {

  public mount(_app: Application): Application {
    console.log('Initializing routes');
    _app.get('/', (req, res) => {
      res.send(`<h3>It's ${os.hostname()} server</h3>`);
    });

    _app.use('/auth', AuthRoute);
    return _app;
  }
}

export default new Routes;