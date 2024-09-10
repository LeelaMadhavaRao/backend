import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { logger } from '../../logger';

export const initializeMulter = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });
        const uploadFn = upload.any();
        uploadFn(req, res, function (err) {
            if (err) {
                logger.error(err);
                next(err);
            }
            next();
        })
    }
}
