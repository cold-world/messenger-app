import Redis from 'ioredis/built/Redis';

const redis = new Redis(process.env.REDIS_URL!);

export default redis;
