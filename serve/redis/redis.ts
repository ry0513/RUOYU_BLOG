import { createClient, RedisClientType } from "redis";

export const redisRun = async ({
  redis_host,
  redis_port,
  redis_passwd,
  redis_db,
}: RedisConfig) => {
  return new Promise<boolean>((resolve) => {
    common.redis = createClient({
      url: `redis://:${redis_passwd}@${redis_host}:${redis_port}/${redis_db}`,
    });
    common.redis.on("ready", () => {
      common.logger!.info("Redis 模块: 连接正常");
      resolve(true);
    });
    common.redis.on("error", (err) => {
      common.logger!.error("Redis 模块: 连接异常", err);
      resolve(false);
    });
    common.redis.connect();
  });
};

export const redisTest = async ({
  redis_host,
  redis_port,
  redis_passwd,
  redis_db,
}: RedisConfig) => {
  return new Promise<Boolean>((resolve) => {
    const client = createClient({
      url: `redis://:${redis_passwd}@${redis_host}:${redis_port}/${redis_db}`,
    });
    client.on("ready", () => {
      common.logger!.info("Redis 模块: 连接正常");
      client.disconnect();
      resolve(true);
    });
    client.on("error", (err) => {
      common.logger!.error("Redis 模块: 连接异常", err);
      client.disconnect();
      resolve(false);
    });
    client.connect();
  });
};
