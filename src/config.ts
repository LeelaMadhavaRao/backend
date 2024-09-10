// MONGODB
export const PORT = process.env.port ?? 3000;
export const DB_HOST = process.env.DB_HOST ?? 'localhost';
export const DB_NAME = process.env.DB_NAME ?? 'coders-gallery';
export const DB_USERNAME = process.env.DB_USERNAME ?? '';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
export const DB_SOURCE = process.env.DB_SOURCE ?? 'admin';

// JWT
export const JWT_SECRET = process.env.JWT_SECRET ?? 'secret-key';
export const JWT_EXPIRY = process.env.JWT_EXPIRY ?? '7d';

// GENERAL
export const LOGS_PATH = process.env.LOGS_PATH ?? '.logs';
export const ASSETS_PATH = process.env.ASSETS_PATH ?? 'public';
export const NODE_ENV = process.env.NODE_ENV ?? 'localhost';
export const ENVIRONMENT = process.env.ENVIRONMENT ?? 'http://localhost:3000';
export const TIME_ZONE = process.env.TIME_ZONE ?? 'Asia/Kolkata'

// SECURITY
export const SALT_ROUNDS = process.env.SALT_ROUNDS ?? 2;

// REDIS
export const REDIS_PORT = process.env.REDIS_PORT ?? 6379;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD ?? '';
export const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';

// CRON
export const DAILY_CRON = process.env.DAILY_CRON ?? '0 0 * * *';


export const CODEFORCES_API_KEY = process.env.CODEFORCES_API_KEY ?? ""
export const CODEFORCES_API_SECRET = process.env.CODEFORCES_API_SECRET ?? ""