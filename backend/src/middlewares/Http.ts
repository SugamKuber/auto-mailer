import express from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import expressValidator from "express-validator";
import type { Application } from "express";

class Http {

  public static init(_app: Application): Application {
    console.log("Initializing HTTP middleware");
    _app.use(expressValidator());
    _app.use(hpp());
    _app.use(helmet());
    _app.use(express.json());
    _app.use(express.urlencoded({ extended: false }));
    _app.use(compression());

    return _app;
  }
}

export default Http;
