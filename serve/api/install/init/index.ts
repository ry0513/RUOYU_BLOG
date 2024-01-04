import { Router } from "express";
import fs from "fs-extra";
import { mysqlRun } from "../../../db/sequelize.js";
import { redisTest } from "../../../redis/redis.js";

export default async () => {
  return new Promise<Router>(async (resolve) => {
    const router = Router();

    router.post("/", async (req, res) => {
      const {
        db_host,
        db_port,
        db_database,
        db_user,
        db_passwd,
        redis_host,
        redis_port,
        redis_passwd,
        redis_db,
        account_api,
        account_token,
        account_appId,
        account_serveKey,
        account_clientKey,
      } = req.body;
      if (
        !(await mysqlRun({
          db_host,
          db_port,
          db_database,
          db_user,
          db_passwd,
        }))
      ) {
        common.res.error(res, {
          title: "数据库连接测试失败",
          describe: "请检查参数或检查服务是否启动",
        });
      } else if (
        !(await redisTest({ redis_host, redis_port, redis_passwd, redis_db }))
      ) {
        common.res.error(res, {
          title: "Redis 连接测试失败",
          describe: "请检查参数或检查服务是否启动",
        });
      } else {
        fs.writeFileSync(
          common.path("root", "config/config.json"),
          JSON.stringify(
            {
              db_host,
              db_port,
              db_database,
              db_user,
              db_passwd,
              redis_host,
              redis_port,
              redis_passwd,
              redis_db,
              account_api,
              account_token,
              account_appId,
              account_serveKey,
              account_clientKey,
            },
            null,
            2
          )
        );
        common.logger!.info("MySQL 模块: 开始初始化数据结构");
        await common.sequelize!.sync({ force: true, alter: true });
        common.logger!.info("生成 config.json 文件");
        common.res.success(res);
        common.os.restart();
      }
    });
    await common.loadRouter(
      router,
      common.path(common.__dirname(import.meta.url))
    );
    resolve(router);
  });
};
