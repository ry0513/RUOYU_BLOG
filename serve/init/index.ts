import express, { Express } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import requestIp from "request-ip";
import connectRedis from "connect-redis";
import fs from "fs-extra";
import session from "express-session";
import logs from "../core/log.js";
import { redisRun } from "../redis/redis.js";
import { mysqlRun } from "../db/sequelize.js";

export default async () => {
  return new Promise<{ app: Express }>(async (resolve, reject) => {
    logs();
    const app = express();
    app.set("trust proxy", true);
    // 处理 post 请求
    app.use(bodyParser.urlencoded({ extended: false }));
    // 去掉 X-Powered-By 响应头
    app.set("x-powered-by", false);
    // 开启 gzip 压缩
    app.use(compression({ threshold: 512 }));
    // 客户端 IP
    app.use(requestIp.mw());

    // 检测配置文件夹,不存在则创建
    const PATH_RESOURCE = common.path("root", "config");
    if (!fs.existsSync(PATH_RESOURCE)) {
      fs.mkdirSync(PATH_RESOURCE);
      common.logger!.info("生成 config 文件夹成功");
    }

    // 检测配置文件是否存在
    if (!fs.existsSync(common.path("root", "config/config.json"))) {
      // 引入安装用的api
      common.logger!.info("config.json 文件不存在，开始执行安装程序");
      app.use(
        "/api/",
        await (await import("../api/install/index.js")).default()
      );
    } else {
      // 引入正常用的api
      common.config = JSON.parse(
        fs.readFileSync(common.path("root", "config/config.json"), "utf-8")
      );

      // 初始化 redis, session
      await redisRun(common.config);
      await mysqlRun(common.config);

      app.use(
        session({
          cookie: {
            maxAge: 1000 * 60 * 60,
          },
          store: new connectRedis({
            client: common.redis,
            prefix: "RY_BLOG_TOKEN:",
          }),
          secret: "RY_BLOG",
          name: "RY_BLOG",
          rolling: true,
          saveUninitialized: false,
          resave: true,
        })
      );
      app.use("/api/", await (await import("../api/v1/index.js")).default());
    }
    app.get("*", await (await import("../webServe/index.js")).default());
    resolve({ app });
  });
};
