import { ObjectId } from 'mongoose';

export interface IUser {
    _id: ObjectId;
    email: string;
    name: string;
    googleId: string;
}

export default IUser;