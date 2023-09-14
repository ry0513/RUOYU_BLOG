/**
 * @description 返回方法
 */
interface ResponseFun {
  /**
   * @description 返回成功
   */
  success: (
    res: import("express").Response,
    obj?: { route?: array; rows?: array }
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
interface Common {
  /**
   * @description 获取绝对路径
   * @param root 初始目录，根目录的话写 root
   * @param other 路径
   */
  path: (root: string, ...other: string[]) => string;
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
  os: {
    serve?: any;
    start: () => void;
    restart: () => void;
  };
}
