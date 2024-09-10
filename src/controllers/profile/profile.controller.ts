import { Controller, Get, Post } from "@overnightjs/core";
import { Profile } from "../../models/profile/profile.model";
import { HandleError } from "../../utils/middlewares/error-handler.middleware";
import { Request, Response } from 'express'
import { ProfileService } from "./profile.service";
import { PlatformsService } from "../platforms/platfroms.service";

@Controller('profile')
export class ProfileController {
    @Get('')
    @HandleError
    async getProfile(req: Request, res: Response) {
        const result = await Profile.find().sort({ rank: 1 }).limit(req.body.limit || 10);
        res.status(200).json(result);
    }

    @Get('user/:username')
    @HandleError
    async getUserProfile(req: Request, res: Response) {
        const result = await Profile.find({ 'Profiles.username': req.params.username }).sort({ rank: 1 });
        res.status(200).json(result);
    }

    @Get('test/:username')
    @HandleError
    async test(req: Request, res: Response) {
        const result = await new PlatformsService().getGreekforGreeksData({
            name: 'GREEKFORGREEKS',
            scores: {
                score: 0,
                rank: 0,
                solved: 0,
                rating: 0,
                streak: 0
            },
            username: req.params.username
        });
        res.status(200).json(result);
    }
    @Post('')
    @HandleError
    async createProfile(req: Request, res: Response) {
        const result = await new ProfileService().setUpUser(req.body);
        res.status(200).json(result);
    }


}