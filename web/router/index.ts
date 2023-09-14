import {
  createRouter as _createRouter,
  createWebHistory,
  createMemoryHistory,
  RouteRecordRaw,
} from "vue-router";

// 存放固定的路由
const routes: Array<RouteRecordRaw> = [];

export const createRouter = () => {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
};
