import * as express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import * as mongo from './db';
import * as controllers from './controllers';
import morganMiddleware from './utils/middlewares/morganMiddleware';
import { logger } from './logger';
import { Server } from '@overnightjs/core';
// import { HandleAuthentication } from './@utils/middlewares/authentication.middleware';

const port = 3001;

export default class App extends Server {
    jwtEscapeUrls = [/\/auth\/.*/, /\/profile\/.*/];
    whitelist = [/http:\/\/localhost:[0-9]+/];

    constructor() {
        super();
        this.corsPolicy();
        this.middleware();
        mongo.connect();
        this.loadControllers();
        this.setupRoutes();  // Ensure root route is handled
        this.startCron();
    }

    private corsPolicy() {
        this.app.use(cors({
            origin: this.whitelist,
            credentials: true
        }));
    }

    private middleware() {
        this.app.use(json({ limit: '5mb' }));
        this.app.use(morganMiddleware);
        this.app.use(express.static('public'));
    }

    private loadControllers() {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            logger.info('Loading Controller: ' + name);
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        this.addControllers(controllerInstances, undefined);
    }

    private setupRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Welcome to the API!');
        });
    }

    public start() {
        this.app.listen(port, () => {
            logger.info(`Listening at port: ${port}`);
        });
    }

    startCron() {
        if (process.env.NODE_APP_INSTANCE === '0') {
            logger.info('Starting Cron Job');
        }
    }
}
