//cron job to update the rank of the users based on the total score 

import { CronJob } from 'cron';
import { Profile } from '../models/profile/profile.model';

export class RankCron {
    private job: CronJob;

    constructor() {
        this.job = new CronJob('0 0 * * *', async () => {
            const profiles = await Profile.find().sort({ totalScore: -1 });
            let rank = 1;
            profiles.map(async (profile) => {
                await Profile.updateOne({ _id: profile._id }, { rank: rank });
                rank++;
            });
        });
    }

    start() {
        this.job.start();
    }
}