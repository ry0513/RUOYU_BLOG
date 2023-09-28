import { _getUserInfo } from "@/api/user/index";
import formatRoute from "@/utils/route";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { RouteRecordRaw, Router } from "vue-router";

export const useUserStore = defineStore("articleStore", () => {
  const state: {
    user: {
      userId: number;
      avatar?: string;
      nickName?: string;
    };
    route: RouteRecordRaw[];
    currentRoute: string;
  } = reactive({
    user: { userId: 0 },
    route: [],
    currentRoute: "/",
  });

  /**
   * @description 获取个人信息
   */
  const getUserInfo = () => {
    return new Promise<Boolean>((resolve) => {
      _getUserInfo()
        .then(({ data: { user, route, system } }) => {
          // console.log(user, route, system);

          if (user) {
            state.user = user;
          }
          state.route = route;
          resolve(true);
        })
        .catch(() => {});
    });
  };

  const setRoute = (router: Router, url?: string) => {
    return new Promise((resolve, reject) => {
      formatRoute(state.route).forEach((val) => {
        router.addRoute(val);
      });
      if (url) {
        state.currentRoute = url;
      }
      resolve(true);
    });
  };

  const getRoute = () => {
    return formatRoute(state.route);
  };

  return {
    ...toRefs(state),
    getUserInfo,
    setRoute,
    getRoute,
  };
});
