import { createApp } from "./main";
import { permission } from "@/utils/permission";
import { useUserStore } from "./store";

const { app, router, store } = createApp();
permission(router);
router.isReady().then(async () => {
  router.beforeResolve(async (to, from) => {
    let diffed = false;
    const activated = to.matched.filter((c, i) => {
      return (
        diffed || (diffed = from.matched[i] !== c) || (diffed = !!c.meta.diffed)
      );
    });

    const matchedComponents = activated.flatMap((record: any) =>
      Object.values(record.components)
    );

    if (!activated.length) return true;
    await Promise.all(
      matchedComponents.map((c: any) => {
        if (c.asyncData) {
          return c.asyncData({ route: to, store });
        }
        return true;
      })
    );
  });

  app.mount("#app");
});

store.state.value = JSON.parse(
  (document.getElementById("app-state")?.innerText as string) || "{}"
);
