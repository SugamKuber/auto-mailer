import { google } from 'googleapis';
import User from "../models/user";
import Token from "../models/token";

export const createToken = async (code: string) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_CALLBACK
    );

    const { tokens } = await oauth2Client.getToken({ code: code.toString() });
    oauth2Client.setCredentials(tokens);
    const userInfo = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });
    const userData = await userInfo.userinfo.get();

    const email = userData.data.email;
    const user = await User.findOne({ email: email });
    let token = await Token.findOne({ userId: user._id });

    if (!token) {
      token = new Token({ access_token: tokens.access_token, expiry_date: tokens.expiry_date, id_token: tokens.id_token, userId: user._id });
    }
    await token.save();
    return email;

  } catch (error) {
    console.log(error);
    return null;
  }
};