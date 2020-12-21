import redis from 'redis';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from "express";



const { RateLimiterRedis } = require('rate-limiter-flexible');




const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
})

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 10,
    duration: 1,
})

export default async function rateLimiter(request: Request, response: Response, next: NextFunction):Promise<void> {

    try {
        await limiter.consume(request.ip)

        return next();
    } catch (err) {
        throw new AppError('Muitas requisições', 429)
    }


}