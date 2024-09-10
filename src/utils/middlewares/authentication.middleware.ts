import type { NextFunction, Response } from 'express'
import Jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../config'
import { logger } from '../../logger'
import { User, type IUser } from '../../models/authentication/user.model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HandleAuthentication(req: any, res: Response, next: NextFunction) {
    // const bearer = req.headers.authorization as string
    // const token: string = bearer?.replace('Bearer ', '')

    // Jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
    //     if (err) {
    //         logger.error(err.message)
    //         if (err.name === 'TokenExpiredError') {
    //             return res.status(401).send({
    //                 success: false,
    //                 message: 'Sesssion Expired',
    //                 type: 'Unauthorized'
    //             })
    //         }

    //         return res.status(401).send({
    //             success: false,
    //             message: 'Unauthorized',
    //             type: 'Unauthorized'
    //         })
    //     } else {

    //         // const user = decodedToken
    //         // if(!user) {
    //         //     return res.status(401).send({
    //         //         success: false,
    //         //         message: 'User does not exist',
    //         //         type: 'Unauthorized'
    //         //     })
    //         // }
    //         // req.user = user as IUser
    //         next()
    //     }
    // })
    next()

}
