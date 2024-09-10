import { Controller, Post } from '@overnightjs/core';
import { HandleError } from '../../utils/middlewares/error-handler.middleware';
import type { Request, Response } from 'express'
// import { loginByEmailPassword } from './authentication.service';

@Controller('auth')
export class AuthenticationController {

    // @Post('login')
    // @HandleError
    // async loginUser(req: Request, res: Response) {
    //     const result = await loginByEmailPassword(req.body.username, req.body.password)
    //     return res.json(result)
    // }
}
