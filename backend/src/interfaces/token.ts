import { ObjectId } from 'mongoose';

interface IToken {
    _id: ObjectId;
    access_token: string;
    id_token: string;
    expiry_date: number;
    userId: ObjectId;
    __v: number;
    scope?: string; // Add optional scope property
    token_type?: string; // Add optional token_type property
}

export default IToken;