/**
 * @description 返回方法
 */
interface ResponseFun {
  /**
   * @description 返回成功
   */
  success: (
    res: import("express").Response,
    obj?: { route?: any[]; rows?: any[]; state?: string }
  ) => void;
  /**
   * @description 参数错误
   */
  parameter: (res: import("express").Response, obj?: {}) => void;
  /**
   * @description 需要登录
   */
  needLogin: (res: import("express").Response, obj?: {}) => void;
  /**
   * @description 权限不足
   */
  permission: (res: import("express").Response, obj?: {}) => void;
  /**
   * @description 其他错误
   */
  error: (
    res: import("express").Response,
    obj?: { describe?: string; title?: string }
  ) => void;
}

/**
 * @description 日志方法
 */
interface loggerFun {
  /**
   * @description 普通日志
   * @param msg 自定义内容
   */
  info: (msg: string) => void;
  /**
   * @description 错误日志
   * @param msg 自定义内容
   * @param err 错误实例 new Error()
   */
  error: (msg: string, err?: { message: string }) => void;
}

/**
 * @description os方法
 */
interface osFun {
  serve?: any;
  start: () => void;
  restart: () => void;
}

interface Common {
  /**
   * @description 获取指定文件绝对路径
   * @param root 初始目录，根目录的话写 root
   * @param other 路径
   */
  path: (root: string, ...other: string[]) => string;

  /**
   * @description 获取当前文件绝对路径
   * @param url import.meta.url
   */
  __dirname: (url: string) => string;

  /**
   * @description 装载子路由
   */
  loadRouter: (
    router: import("express").Router,
    dirname: string
  ) => Promise<Boolean>;

  /**
   * @description 请求返回函数
   */
  res: ResponseFun;

  /**
   * @description express 实例
   */
  os: osFun;

  /**
   * @description joi 方法
   */
  joi: import("joi").Root;

  /**
   * @description 请求参数参数校验
   */
  verify: (
    property: "body" | "query" | "params" | "files",
    schema: import("joi").ObjectSchema<any>,
    callback?: Function
  ) => (
    req: import("express").Request,
    res: import("express").Response,
    next: import("express").NextFunction
  ) => void;

  /**
   * @description redis 缓存库
   */
  redis?: import("redis").RedisClientType;

  /**
   * @description UUID
   */
  uuid: () => string;

  /**
   * @description 日志
   */
  logger?: loggerFun;

  /**
   * @description dayjs
   */
  dayjs: (
    date?: string | number | import("dayjs").Dayjs | Date
  ) => import("dayjs").Dayjs;

  /**
   * @description 缓存相关
   */
  cache: {
    appState: {
      [key: string]: string;
    };
  };
}
