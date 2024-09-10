import type { Document, Model } from 'mongoose';
import { model, Schema } from 'mongoose';

export interface TProfile extends Document {
    user: string;
    profiles: {
        name: string; //leetcode, codeforces, hackerrank, hackerearth
        scores: {
            score: number;
            rank: number;
            solved: number;
            rating: number;
            streak: number;
        },
        username: string;
    }[];
    socials: {
        name: string;
        url: string;
    }[];
    rank: number;
    totalScore: number;
    recentActivity: Date;
}

const profileSchema: Schema = new Schema({
    user: { type: String, required: true },
    profiles: [{
        name: { type: String, required: true },
        scores: {
            score: { type: Number, required: true },
            rank: { type: Number, },
            solved: { type: Number, },
            rating: { type: Number, },
            streak: { type: Number, },
        },
        username: { type: String, required: true },
    }],
    socials: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
    }],
    resume: { type: String, },
    rank: { type: Number },
    totalScore: { type: Number, required: true },
    recentActivity: { type: Date, default: Date.now },
}, { timestamps: true })

profileSchema.index({ user: 1, rank: 1 }, { unique: true });

export const Profile: Model<TProfile> = model<TProfile>('profile', profileSchema)