import { Sequelize } from "sequelize-typescript";
export const mysqlTest = ({
  db_host,
  db_port,
  db_database,
  db_user,
  db_passwd,
}: MysqlConfig) => {
  return new Promise<boolean>((resolve, reject) => {
    new Sequelize(db_database, db_user, db_passwd, {
      host: db_host,
      port: db_port,
      dialect: "mysql",
      logging: false,
    })
      .authenticate()
      .then(() => {
        logger.info("MYSQL 模块: 连接正常");
        resolve(true);
      })
      .catch((err) => {
        logger.error("MYSQL 模块: 连接异常", err);
        resolve(false);
      });
  });
};
