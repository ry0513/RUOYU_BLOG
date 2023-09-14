import { createClient } from "redis";

export const redisTest = async ({
  redis_host,
  redis_port,
  redis_passwd,
  redis_db,
}) => {
  return new Promise<Boolean>((resolve) => {
    const client = createClient({
      url: `redis://:${redis_passwd}@${redis_host}:${redis_port}/${redis_db}`,
    });
    client.on("ready", () => {
      logger.info("Redis 模块: 连接正常");
      resolve(true);
    });
    client.on("error", (err) => {
      client.disconnect();
      logger.error("Redis 模块: 连接异常", err);
      resolve(false);
    });
    client.connect();
  });
};
