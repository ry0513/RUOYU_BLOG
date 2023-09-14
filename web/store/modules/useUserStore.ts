import { _getUserInfo } from "@/api/user/index";
import formatRoute from "@/utils/route";
import { defineStore } from "pinia";
import { reactive, ref, toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";

export const useUserStore = defineStore("articleStore", () => {
  const state: {
    user: {
      userId: number;
      avatar?: string;
      nickName?: string;
    };
    route: RouteRecordRaw[];
  } = reactive({
    user: { userId: 0 },
    route: [],
  });

  /**
   * @description 获取个人信息
   */
  const getUserInfo = () => {
    return new Promise<Boolean>((resolve) => {
      _getUserInfo()
        .then(({ data: { user, route, system } }) => {
          if (user) {
            state.user = user;
          }
          state.route = route;
          resolve(true);
        })
        .catch(() => {});
    });
  };

  /**
   * @description 获取路由
   */
  const getRoute = () => formatRoute(state.route);

  return {
    ...toRefs(state),
    getUserInfo,
    getRoute,
  };
});
