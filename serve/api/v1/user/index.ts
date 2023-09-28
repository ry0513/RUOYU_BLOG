import { Router } from "express";

export default async () => {
  return new Promise<Router>(async (resolve) => {
    const router = Router();

    // 获取信息 "/info" "get"
    router.get("/info", async (req, res) => {
      // 临时写死路由
      const route = [
        {
          path: "/",
          component: "layouts/web/index",
          children: [
            {
              path: "",
              name: "home",
              component: "pages/home/index",
            },
          ],
        },
        {
          path: "/login",
          component: "layouts/blank/index",
          children: [
            {
              path: "",
              name: "login",
              component: "pages/login/index",
            },
          ],
        },
        // {
        //   path: "/",
        //   name: "",
        //   component: "layouts/web/index",
        //   redirect: "/",
        //   children: [
        //     {
        //       path: "",
        //       name: "home",
        //       component: "pages/home/index",
        //       meta: {
        //         title: "首页",
        //         icon: "layers",
        //       },
        //     },
        //   ],
        // },
      ];
      common.res.success(res, { route });
    });

    // 登录 "/login" "post"
    router.post("login", (req, res) => {});

    await common.loadRouter(
      router,
      common.path(common.__dirname(import.meta.url))
    );
    resolve(router);
  });
};
