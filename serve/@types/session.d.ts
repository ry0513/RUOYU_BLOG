import "express-session";

declare module "express-session" {
  interface Session {
    /**
     * @description 账号信息
     */
    user: {
      userId: number;
      nickName: string;
      avatar: string;
      permission: string[] | "*";
      status: number;
    };
  }
}
