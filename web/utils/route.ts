import { RouteRecordRaw } from "vue-router";

// 批量导入 layouts 与 pages 目录下的 vue 文件
const routeAllPathToCompMap = import.meta.glob(`../{layouts,pages}/**/*.vue`);

const formatRoute = (list: Array<RouteRecordRaw>): Array<RouteRecordRaw> => {
  const newList = formatRouteList(list);

  newList.push({
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/pages/error/404.vue"),
  });

  return newList;
};

const formatRouteList = (
  list: Array<RouteRecordRaw>
): Array<RouteRecordRaw> => {
  const newList: Array<RouteRecordRaw> = [];
  list.filter((item) => {
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      component: routeAllPathToCompMap[`../${item.component}.vue`],
      meta: item.meta,
      redirect: item.redirect,
      children: formatRouteList(item.children || []),
    };
    newList.push(route);
  });
  return newList;
};

export default formatRoute;

export const getPath = (path: string, maxLevel: number) => {
  return path
    .split("/")
    .filter((_item: string, index: number) => index <= maxLevel && index > 0)
    .map((item: string) => `/${item}`)
    .join("");
};
