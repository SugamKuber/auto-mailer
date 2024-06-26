import type { Application } from "express";
import passport from "../services/google";

class Passport {
  public static init(_app: Application): Application {
    console.log("Initializing Passport");
    _app.use(passport.initialize());
    _app.use(passport.session());
    return _app;
  }
}

export default Passport;
