declare module globalThis {
  /**
   * @description 核心方法
   */
  var common: Common;
}

namespace RY {
  /**
   * @description express.Response
   */
  type Response = import("express").Response;
  /**
   * @description express.Request
   */
  type Request = import("express").Request<
    { [key: string]: any },
    { [key: string]: any },
    { [key: string]: any },
    { [key: string]: any }
  >;

  /**
   * @description 提取某些key并转为{key?:value}
   */
  type Pick<T extends object, K extends keyof T> = {
    [P in K]?: T[P];
  };

  /**
   * @description 提取某些key并转为key[]
   */
  type Array<T extends object, K extends keyof T> = K[];

  /**
   * @description 提取某些key并转为可选的 {key?:value[]}
   */
  type PickArr<T extends object, K extends keyof T> = {
    [P in K]?: T[P][];
  };
}
