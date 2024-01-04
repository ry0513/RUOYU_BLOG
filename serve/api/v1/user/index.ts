import { Router } from "express";
import axios from "axios";
import qs from "qs";
import { createUser, getUser } from "../../../db/api/user.js";

export default async () => {
  return new Promise<Router>(async (resolve) => {
    const router = Router();

    // 获取信息 "/info" "get"
    router.get("/info", async (req, res) => {
      // 临时写死路由
      const route = [
        {
          path: "/",
          name: "",
          component: "layouts/web/index",
          children: [
            {
              path: "",
              name: "home",
              component: "pages/home/index",
              meta: {
                title: "首页",
                icon: "layers",
              },
            },
          ],
        },
        {
          path: "/token",
          name: "token",
          component: "pages/login/token",
        },
        {
          path: "/test",
          component: "layouts/web/index",
          children: [
            {
              path: "",
              name: "test",
              component: "pages/home/index",
            },
          ],
        },
      ];

      common.res.success(res, { route, user: req.session.user });
    });

    // 登录 "/login" "post"
    router.post(
      "/login",
      common.verify(
        "body",
        common.joi.object().keys({
          tk: common.joi
            .string()
            .required()
            .alphanum()
            .length(32)
            .error(new Error("tk 不符合验证格式")),
          loginCode: common.joi
            .string()
            .required()
            .alphanum()
            .length(32)
            .error(new Error("tk 不符合验证格式")),
        })
      ),
      async (req, res) => {
        const { tk, loginCode } = req.body;
        if (req.session.loginCode !== loginCode) {
          return common.res.error(res, {
            title: "登录失败",
            describe: "请重新尝试",
          });
        }
        req.session.loginCode = "";
        try {
          const {
            data: { code, data },
          } = await axios({
            url: common.config.account_api,
            method: "post",
            data: qs.stringify({
              appId: common.config.account_appId,
              serveKey: common.config.account_serveKey,
              tk,
            }),
          });
          if (code === 0) {
            const { accountId, nickName, avatar, email = "" } = data;
            // 通过 accountId 验证 登录
            let user = await getUser({
              where: { userId: accountId },
              attributes: ["status"],
            });
            if (!user) {
              user = await createUser({
                userId: accountId,
                nickName: nickName,
                avatar: avatar,
                permission: "*",
                status: 0,
                email,
              });
            }
            req.session.user = user;
            common.res.success(res);
          } else {
            common.res.error(res, {
              title: "登录失败",
              describe: data,
            });
          }
        } catch (error: any) {
          common.logger!.error("登录认证错误", error);
          common.res.error(res, {
            title: "登录失败",
            describe: "登录认证失败",
          });
        }
      }
    );

    // 获取登录链接
    router.get("/login", (req, res) => {
      const loginCode = common.uuid("");
      req.session.loginCode = loginCode;
      const link = `${common.config.account_token}?appId=${common.config.account_appId}&clientKey=${common.config.account_clientKey}`;
      common.res.success(res, { data: { link, loginCode } });
    });

    await common.loadRouter(
      router,
      common.path(common.__dirname(import.meta.url))
    );
    resolve(router);
  });
};
