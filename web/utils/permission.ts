import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Router } from "vue-router";
import { useUserStore } from "@/store";
NProgress.configure({ showSpinner: false });

let registerRoute = false;
export const permission = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    if (!registerRoute) {
      useUserStore()
        .getRoute()
        .forEach((val) => {
          router.addRoute(val);
        });
      registerRoute = true;
      next({ ...to, replace: true });
    } else {
      next();
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
};
