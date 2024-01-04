import User from "../models/User.js";

/**
 * @description 获取用户信息
 */
export const getUser = ({ where, attributes = [] }: User.getUser) => {
  return User.findOne({
    where,
    attributes: ["userId", "nickName", "avatar", ...attributes],
  });
};

/**
 * @description 创建用户信息
 */
export const createUser = async (data: User.createUser) => {
  return User.create(data);
};
