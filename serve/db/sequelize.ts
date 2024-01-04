import { Sequelize } from "sequelize-typescript";
import models from "./index.js";

const getSequelize = async ({
  db_host,
  db_port,
  db_database,
  db_user,
  db_passwd,
}: MysqlConfig) => {
  return new Promise<Sequelize>(async (resolve, reject) => {
    resolve(
      new Sequelize(db_database, db_user, db_passwd, {
        host: db_host,
        port: db_port,
        dialect: "mysql",
        logging: false,
        define: {
          // 字段以下划线（_）来分割（默认是驼峰命名风格）
          underscored: true,
        },
        models: await models(),
      })
    );
  });
};

/**
 * @description 运行mysql
 */
export const mysqlRun = (mysqlConfig: MysqlConfig) => {
  return new Promise<boolean>(async (resolve) => {
    common.sequelize = await getSequelize(mysqlConfig);
    common.sequelize
      .authenticate()
      .then(async () => {
        common.logger!.info("MYSQL 模块: 连接正常");
        await common.sequelize!.sync({ force: false, alter: true });
        resolve(true);
      })
      .catch((err) => {
        common.logger!.error("MYSQL 模块: 连接异常", err);
        resolve(false);
      });
  });
};
