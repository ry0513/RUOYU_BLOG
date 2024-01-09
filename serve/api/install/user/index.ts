import { Router } from "express";

export default async () => {
  return new Promise<Router>(async (resolve) => {
    const router = Router();

    // 获取信息 "/info" "get"
    router.get("/info", async (req, res) => {
      const route = [
        {
          path: "/install",
          name: "install",
          component: "pages/install/index",
        },
        {
          path: "/:pathMatch(.*)*",
          name: "NotFound",
          redirect: "/install",
        },
      ];

      common.res.success(res, { route });
    });

    await common.loadRouter(
      router,
      common.path(common.__dirname(import.meta.url))
    );
    resolve(router);
  });
};
