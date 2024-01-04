import { createApp } from "./main";
import { permission } from "@/utils/permission";
import { useUserStore } from "./store";

const { app, router, store } = createApp();

(async () => {
  // appState
  store.state.value =
    (window.appState &&
      JSON.parse(decodeURIComponent(window.atob(window.appState)))) ||
    {};
  const userStore = useUserStore();
  userStore.cancelRegisterRoute();

  permission(router);
  // 组件解析守卫
  router.beforeResolve(async (to, from) => {
    let diffed = false;
    const activated = to.matched.filter((c, i) => {
      return (
        diffed || (diffed = from.matched[i] !== c) || (diffed = !!c.meta.diffed)
      );
    });
    if (!activated.length) return true;
    await Promise.all(
      activated
        .flatMap((record: any) => Object.values(record.components))
        .map((c: any) => {
          if (c.asyncData) {
            return c.asyncData({ route: to, store });
          }
          return true;
        })
    );
  });
  await router.isReady();
  app.mount("#app");
})();
