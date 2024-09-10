import type { Document, Model } from 'mongoose';
import { model, Schema, Types } from 'mongoose';

export interface AUTH_PROVIDERS {
    GOOGLE: 'google',
    GITHUB: 'github',
}
export const COLOR_CODES = ['#3B82F6', '#F79411', '#6A76F2', '#12B76A', '#E86565', '#4DBAC4'];

export interface IUser extends Document {
    username: string;
    profile: Types.ObjectId;
    isActive: boolean;
    authType: AUTH_PROVIDERS;
    authId: string;
    email: string;
    name: string;
    recentActivity: Date;
    emailVerified: boolean;
    profilePic: string;
    stars: {
        count: number;
        users: string[];
    }
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    profile: { type: Types.ObjectId, ref: 'Profile' },
    isActive: { type: Boolean, default: true },
    authType: { type: String, required: true },
    authId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    recentActivity: { type: Date, default: Date.now },
    emailVerified: { type: Boolean },
    profilePic: { type: String, default: '' },
    stars: {
        count: { type: Number, default: 0 },
        users: [{ type: String }],
    }
}, { timestamps: true })

userSchema.index({ username: 1, isActive: 1 }, { partialFilterExpression: { isActive: true }, unique: true });

export const User: Model<IUser> = model<IUser>('User', userSchema)
