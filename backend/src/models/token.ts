import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

export interface IToken extends Document {
  access_token: string;
  id_token: string;
  expiry_date: number;
  userId: IUser['_id'];
}

const tokenSchema: Schema = new Schema({
  access_token: String,
  id_token: String,
  expiry_date: Number ,
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true }, 
});

export default mongoose.model<IToken>('Token', tokenSchema);
