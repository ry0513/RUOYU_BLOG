import { _getUserInfo, _login } from "@/api/user/index";
import formatRoute from "@/utils/route";
import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import { RouteRecordRaw, Router } from "vue-router";

export const useUserStore = defineStore("userStore", () => {
  const state: {
    registerRoute: boolean;
    user: {
      userId: number;
      avatar?: string;
      nickName?: string;
    };
    route: RouteRecordRaw[];
  } = reactive({
    registerRoute: false,
    user: { userId: 0 },
    route: [],
  });

  /** @description 登录 */
  const login = (data: loginData) => {
    return new Promise<boolean>((resolve, reject) => {
      _login(data)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          resolve(false);
        });
    });
  };
  /** @description 获取个人信息 */
  const getUserInfo = (router: Router, cookie?: string) => {
    return new Promise<Boolean>(async (resolve) => {
      if (state.route.length === 0) {
        const {
          data: { user, route },
        } = await _getUserInfo(cookie);
        if (user) {
          state.user = user;
        }
        state.route = route;
      }

      formatRoute(state.route).forEach((val) => {
        router.addRoute(val);
      });

      state.registerRoute = true;
      resolve(true);
    });
  };

  /** @description 取消路由 */
  const cancelRegisterRoute = ({ resetRoute = false } = {}) => {
    state.registerRoute = false;
    if (resetRoute) {
      state.route = [];
    }
  };

  return {
    ...toRefs(state),
    getUserInfo,
    login,
    cancelRegisterRoute,
  };
});
