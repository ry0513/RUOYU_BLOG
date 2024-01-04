import User from "../../db/models/User.js";

declare global {
  namespace User {
    /**
     * @description 创建用户
     */
    type createUser = Pick<
      User,
      "nickName" | "avatar" | "permission" | "status" | "email"
    > &
      RY.Pick<User, "userId">;

    /**
     * @description 获取用户信息
     */
    type getUser = {
      where: Pick<User, "userId">;
      attributes: RY.Array<User, "status" | "permission" | "email">;
    };
  }
}
