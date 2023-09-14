import instance from "@/utils/request";

/**
 * @description 提交初始配置
 */
export const _postInitConfig = (data: any) => {
  return instance({
    url: "/init",
    method: "post",
    data,
  });
};
