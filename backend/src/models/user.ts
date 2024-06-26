import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  email: string;
  displayName: string;

}

const userSchema: Schema = new Schema({
  googleId: String,
  email: { type: String, unique: true },
  displayName: String,
});

export default mongoose.model<IUser>('User', userSchema);
