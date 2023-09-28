import { resolve, dirname } from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import init from "../init/index.js";
import dayjs from "dayjs";

global.common = {
  path: (root, ...other) => {
    if (root === "root") {
      return resolve(...other);
    } else {
      return resolve(root, ...other);
    }
  },
  __dirname: (url) => {
    return dirname(fileURLToPath(url));
  },
  loadRouter: (router, dirname) => {
    return new Promise<boolean>(async (resolve) => {
      const routeList = fs.readdirSync(common.path(dirname)).filter((item) => {
        return !["index.js", "index.ts"].includes(item);
      });
      for (const key of routeList) {
        await new Promise<boolean>((resolve) => {
          if (fs.statSync(common.path(dirname, key)).isDirectory()) {
            import(common.path(dirname, key, "./index.js")).then(
              async (item) => {
                router.use(`/${key}`, await item.default());
                resolve(true);
              }
            );
          } else {
            import(common.path(dirname, key)).then(async (item) => {
              router.use(`/${key.split(".")[0]}`, item.default);
              resolve(true);
            });
          }
        });
      }
      resolve(true);
    });
  },
  res: {
    success: (res, obj = {}) => {
      res.send({ ...obj, msg: "操作成功", code: 0 });
    },

    parameter: (res, obj = {}) => {
      res.send({ code: -1, msg: "请检查参数", ...obj });
    },

    needLogin: (res, obj = {}) => {
      res.send({ code: -2, msg: "没有找到登录信息，未登录或登录过期", ...obj });
    },
    permission: (res, obj = {}) => {
      res.send({ code: -3, msg: "权限不足", ...obj });
    },
    error: (res, obj = {}) => {
      res.send({ code: -4, msg: "操作失败", ...obj });
    },
  },
  os: {
    start: async () => {
      const { app } = await init();
      common.os.serve = app.listen(
        (process.env.NODE_PORT as unknown as number) || 3500,
        "0.0.0.0",
        () => {
          common.logger.info(
            `监听端口： [ http://127.0.0.1:${process.env.NODE_PORT || 3500} ]`
          );
        }
      );
    },
    restart: () => {
      common.os.serve.close(() => {
        common.logger.info("重启服务...");
        common.os.start();
      });
    },
  },
  joi: Joi,
  verify: (property, ObjectSchema, callback) => {
    return (req, res, next) => {
      const { value, error } = ObjectSchema.validate(req[property], {
        allowUnknown: true,
      });
      const valid = error === undefined;
      if (valid) {
        req[property] = value;
        next();
      } else {
        const { message } = error;
        if (!callback) {
          return common.res.parameter(res, { data: message });
        }
        callback(res);
      }
    };
  },
  uuid: () => {
    return uuidv4();
  },
  dayjs: (date) => dayjs(date),
  cache: {
    appState: {},
  },
};
