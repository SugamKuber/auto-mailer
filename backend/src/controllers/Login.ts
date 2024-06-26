import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import Token from "../models/token";
import IUser from "../interfaces/user";
import { createToken } from "../services/tokens";
import passport from 'passport';

class Login {
  public static async googleCallback(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      passport.authenticate("google", async (error: Error, user: IUser) => {

        if (error) return console.log({ error: "error in logging in", code: 500 });
        if (!user) {
          return console.log({ error: "user not created", code: 500 });
        }
        req.login(user, async function (err) {
          if (err) return console.log({ error: "error logging in", code: 500 });
        });
      })(req, res, next);
    } catch (error) {
      console.log(error);
      return res.json({ msg: error });
    } finally {
      const { code } = req.query;
      console.log(code, 'code');
      const email: string = await createToken(code as string);
      console.log(email, "wawaawddwaaaadddddd");
      if (email != null) {
        res.redirect(`${process.env.FONTEND_REDIRECT}/check?id=${email}`);
      } else {
        res.redirect(`http://${process.env.FONTEND_REDIRECT}/failed`);
      }
    }
  }

  public static async checkValidUserTask(req: Request, res: Response): Promise<Response | void> {
    const email = req.query.email;
    try {
      const user = await User.findOne({ email });
      const token = await Token.findOne({ userId: user._id });

      if (user && token) {
        const currentTime = Date.now();
        const tokenExpiry = token.expiry_date;

        if (tokenExpiry < currentTime) {
          return res.send("Expired");
        }

        res.send("Valid");
      } else {
        res.send(`There seems to be a problem for ${email} try logging in again`);
      }

    } catch (e) {
      console.log(e);
      res.send(`There seems to be a problem for ${email} try logging in again`);
    }

  }

}

export default Login;