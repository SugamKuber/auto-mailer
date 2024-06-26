import { google } from 'googleapis';
import Token from "../models/token";
import IToken from "../interfaces/token";

const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK
);

export const processEmail = async () => {

  const tokens: IToken[] = await Token.find().lean();

  const updatedTokens = tokens.map(token => {
    const { _id, userId, __v, ...modifiedToken } = token;
    modifiedToken.scope = "openid https://mail.google.com/ https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly";
    modifiedToken.token_type = "Bearer";
    return { modifiedToken, userId };
  });

  for (const Token of updatedTokens) {
    try {

      oauth2Client.setCredentials(Token.modifiedToken);

      const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

      async function listUnreadMessages() {
        const res = await gmail.users.messages.list({
          userId: 'me',
          q: 'is:unread',
          maxResults: 1,
        });
        return res.data.messages || [];
      }

      async function getMessage(messageId: string) {
        const res = await gmail.users.messages.get({
          userId: 'me',
          id: messageId,
        });

        await gmail.users.messages.modify({
          userId: 'me',
          id: messageId,
          requestBody: {
            removeLabelIds: ['UNREAD']
          }
        });

        return res.data;

      }

      const unreadMessages = await listUnreadMessages();
      if (unreadMessages.length === 0) {
        console.log(`JOB DONE: NO new emails for ${Token.userId}`);
      } else {

        const fullMessages = await Promise.all(unreadMessages.map(msg => getMessage(msg.id)));

        const message = fullMessages[0];
        const subject = message.payload.headers.find(header => header.name === "Subject").value;
        const from = message.payload.headers.find(header => header.name === "From").value;
        const to = message.payload.headers.find(header => header.name === "To").value;
        const date = message.payload.headers.find(header => header.name === "Date").value;
        const textPlainPart = message.payload.parts.find(part => part.mimeType === "text/plain");
        const textPlainData = textPlainPart.body.data;

        const textPlainDataDecoded = atob(textPlainData);
        const formattedText = textPlainDataDecoded.replace(/\r\n/g, " ");

        function getRandomInteger(min: number, max: number) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // const gptReply = callGPT(subject, from, formattedText)
        // Link GPT account and continue

        // Mocking AI generation
        const replySubject = "Reply: subject";
        const replyBody = `Mocked AI generted number ${getRandomInteger(1, 100)}`;

        const result = from.substring(from.indexOf("\u003C") + 1, from.indexOf("\u003E"));

        const raw = [
          `From: ${to}`,
          `To: ${result}`,
          'Content-Type: text/plain; charset=utf-8',
          `Subject: ${replySubject}`,
          '',
          replyBody
        ].join('\r\n').trim();

        gmail.users.messages.send({
          userId: 'me',
          requestBody: {
            raw: Buffer.from(raw).toString('base64')
          },
          qs: {
            threadId: message.id
          }
        });
        console.log(`JOB DONE: Reply email sent ${to}`);
      }
    } catch (e) {
      console.log(`JOB FAILED for ${Token.userId} with error`);
    }
  }
};


