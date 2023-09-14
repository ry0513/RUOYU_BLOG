import express, { Express } from "express";
import bodyParser from "body-parser";
import fs from "fs-extra";
import logs from "../core/log.js";

export default async () => {
  return new Promise<{ app: Express }>(async (resolve, reject) => {
    logs();
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));

    // 检测配置文件夹,不存在则创建
    const PATH_RESOURCE = common.path("root", "config");
    if (!fs.existsSync(PATH_RESOURCE)) {
      fs.mkdirSync(PATH_RESOURCE);
      logger.info("生成 config 文件夹成功");
    }

    // 检测配置文件是否存在
    if (!fs.existsSync(common.path("root", "config/config.json"))) {
      // 引入安装用的api
      logger.info("config.json 文件不存在，开始执行安装程序");
      app.use(
        "/api/",
        await (await import("../api/install/index.js")).default()
      );
    } else {
      // 引入正常用的api
      app.use("/api/", await (await import("../api/v1/index.js")).default());
    }
    app.get("*", await (await import("../webServe/index.js")).default());

    resolve({ app });
  });
};
