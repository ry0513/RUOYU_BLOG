import { Router } from "vue-router";
import { useUserStore } from "@/store";
import { getPath } from "@/utils/route";

export const permission = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    if (getPath(to.path, 1) === "/control") {
      if (useUserStore().user.userId === 0) {
        return next("/login");
      }
    }
    next();
  });
};
