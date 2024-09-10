/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Response } from 'express';
import { logger } from '../../logger';

const DEFAULT_FAILED_STATUS_CODE = 500;
const DEFAULT_ERROR_CODE = 1000;

export enum ERR_RES_TYPES {
    ERROR = 'error',
    WARNING = 'warning'
}

export class HTTPError extends Error {
    statusCode: number = DEFAULT_FAILED_STATUS_CODE;
    errorCode: number = DEFAULT_ERROR_CODE;
    constructor(message?: string, statusCode?: number, errorCode?: number) {
        super(message);
        this.statusCode = statusCode ? statusCode : DEFAULT_FAILED_STATUS_CODE;
        this.errorCode = errorCode ? errorCode : DEFAULT_ERROR_CODE;
    }
}

// Example Error
// new HTTPError('Some Message', 400, true, ERR_RES_TYPES.ERROR, 1000);

export function HandleError(target: any, _propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any) {
        const response = (args[1] as Response);
        const jsonHandler = response.json.bind(response);

        response.json = function (body?: any): any {
            jsonHandler({
                data: body,
                success: true
            });
        }

        try {
            const _promise = method.apply(target, args);
            await Promise.resolve(_promise);
        } catch (error) {
            logger.error(error);
            response.status(error instanceof HTTPError ? error.statusCode : DEFAULT_FAILED_STATUS_CODE);
            const errorCode = error instanceof HTTPError ? error.errorCode : DEFAULT_ERROR_CODE;
            const message = error instanceof Error ? error.message : 'Something Went Wrong';
            jsonHandler({
                data: null,
                error: message,
                errorCode,
                success: false
            });
        }
    };
}
