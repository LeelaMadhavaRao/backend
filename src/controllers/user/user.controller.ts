import { Controller, Get, Post } from "@overnightjs/core";
import { Profile } from "../../models/profile/profile.model";
import { HandleError } from "../../utils/middlewares/error-handler.middleware";
import type { Request, Response } from 'express'
import { User } from "../../models/authentication/user.model";
@Controller('user')
export class UserController {
    @Get(':username')
    @HandleError
    async getUser(req: Request, res: Response) {
        const result = await User.find({ username: req.params.username }).populate('profile');
        res.status(200).json(result);
    }

    @Get('checkUser/:email')
    @HandleError
    async checkUser(req: Request, res: Response) {
        const result = await User.find({ email: req.params.email })
        return res.json(result);
    }


    @Post('')
    @HandleError
    async createUser(req: Request, res: Response) {
        const result = await User.create(req.body);
        // await SendOnBoardMail(req.body.email);
        res.status(200).json(result);
    }


}