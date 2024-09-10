import mongoose from 'mongoose';
import * as config from './config';
import { logger } from './logger';


let dbUrl = 'mongodb://' + config.DB_HOST + '/' + config.DB_NAME
if (config.DB_USERNAME && config.DB_PASSWORD && config.DB_SOURCE) {
    dbUrl = 'mongodb://' + config.DB_USERNAME + ':' +
        config.DB_PASSWORD + '@' + config.DB_HOST +
        '/' + config.DB_NAME + '?authSource=' + config.DB_SOURCE
}


const applyLean = () => {
    const originalSetOptions = mongoose.Query.prototype.setOptions;
    mongoose.Query.prototype.setOptions = function (options, overwrite) {
        options = Object.assign({}, options);
        if (!Object.prototype.hasOwnProperty.call(options, 'lean')) {
            options.lean = true;
        }
        originalSetOptions.call(this, options, overwrite);
        return this;
    };
}

export const connect  = async () => {
    mongoose.connection.on('connected', () => { logger.info(`Db connected to ${config.DB_HOST} with user ${config.DB_USERNAME}`); });
    mongoose.connection.on('close', () => { logger.info('lost Db connection'); });
    mongoose.connection.on('reconnected', () => { logger.info('Db reconnected'); });
    mongoose.connection.on('error', () => { logger.error('Db connection error'); });
    applyLean();
    mongoose.set('strictQuery', true);
    await mongoose.connect(dbUrl);
}

export const close = () => {
    mongoose.connection.close();
}
