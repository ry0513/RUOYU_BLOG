import { Router } from "vue-router";
import { useUserStore } from "@/store";
import { getPath } from "@/utils/route";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { _loginLink } from "@/api/user";
NProgress.configure({ showSpinner: false });

export const permission = (router: Router, cookie?: string) => {
  const SSR = import.meta.env.SSR;
  const userStore = useUserStore();

  // 路由前置守卫
  router.beforeEach(async (to, from, next) => {
    if (!SSR) {
      NProgress.start();
    }
    if (!userStore.registerRoute) {
      await useUserStore().getUserInfo(router, cookie);
      return next({ ...to, replace: true });
    }
    if (getPath(to.path, 1) === "/token") {
      return next();
    }
    if (getPath(to.path, 1) === "/control") {
      if (userStore.user.userId === 0) {
        if (!SSR) {
          const {
            data: {
              data: { link, loginCode },
            },
          } = await _loginLink();
          const redirectUri = `${encodeURIComponent(
            `${window.location.origin}/token?path=${to.fullPath}&loginCode=${loginCode}`
          )}`;
          window.location.href = `${link}&redirectUri=${redirectUri}`;
        }
        if (!SSR) {
          return next(false);
        }
      }
    }
    next();
  });

  // 路由后置守卫
  router.afterEach(() => {
    if (!SSR) {
      NProgress.done();
    }
  });
};
