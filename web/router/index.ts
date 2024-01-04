import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory,
  RouteRecordRaw,
} from "vue-router";

// 存放固定的路由
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "",
  //   component: () => import("@/layouts/web/index.vue"),
  //   children: [
  //     {
  //       path: "",
  //       name: "home",
  //       component: () => import("@/pages/home/index.vue"),
  //       meta: {
  //         title: "首页",
  //         icon: "layers",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/token",
  //   name: "token",
  //   component: () => import("@/pages/login/token.vue"),
  // },
];

export const createRouter = () => {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
};
