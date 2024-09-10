import { Controller, Get } from "@overnightjs/core";
import { Profile } from "../../models/profile/profile.model";
import { HandleError } from "../../utils/middlewares/error-handler.middleware";
import type { Request, Response } from 'express'
@Controller('leaderboard')
export class LeaderboardController {
    @Get('')
    @HandleError
    async getLeaderboard(req: Request, res: Response) {
        const result = await Profile.find({ totalScore: { $gt: 0 } }).sort({ totalScore: -1 });
        res.status(200).json(result);
    }

    @Get('user/:username')
    @HandleError
    async getUserLeaderboard(req: Request, res: Response) {
        const result = await Profile.find({ 'Profiles.username': req.params.username }).sort({ rank: 1 });
        res.status(200).json(result);
    }
}