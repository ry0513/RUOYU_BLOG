import instance from "@/utils/request";

/**
 * @description 获取个人信息
 */
export const _getUserInfo = (cookie: string) => {
  return instance({
    url: "/user/info",
    headers: {
      cookie,
    },
  });
};

/** @description 登录 */
export const _login = (data: loginData) => {
  return instance({
    url: "/user/login",
    method: "post",
    data,
  });
};

/** @description 获取登录链接 */
export const _loginLink = () => {
  return instance({
    url: "/user/login",
  });
};
