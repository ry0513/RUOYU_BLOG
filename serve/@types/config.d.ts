/**
 * @description mysql 配置文件
 */
interface MysqlConfig {
  db_host: string;
  db_port: number;
  db_database: string;
  db_user: string;
  db_passwd: string;
}

/**
 * @description redis 配置文件
 */
interface RedisConfig {
  redis_port: number;
  redis_host: string;
  redis_passwd: string;
  redis_db?: string;
}
