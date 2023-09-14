import instance from "@/utils/request";

/**
 * @description 获取个人信息
 */
export const _getUserInfo = () => {
  return instance({
    url: "/user/info",
    method: "get",
  });
};
