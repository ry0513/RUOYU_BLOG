import instance from "@/utils/request";

/**
 * @description PING
 */
export const _getPing = () => {
  return instance({
    url: "/ping",
    method: "get",
  });
};
