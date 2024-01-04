import "express-session";
import type { Request } from "express";

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
    loginCode: string;
  }
}

declare global {
  declare module Express {
    interface Request {
      files: {
        [fieldname: string]: Multer.File[];
      };
    }
  }
}
