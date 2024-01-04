import { Router } from "express";

export default async () => {
  return new Promise<Router>(async (resolve) => {
    const router = Router();

    // 获取appState "/:appStateId" "get"
    router.get("/:appStateId", async (req, res) => {
      const appState = Buffer.from(
        encodeURIComponent(
          (await common.redis!.get(`appState:${req.params.appStateId}`)) || "{}"
        )
      ).toString("base64");
      await common.redis!.del(`appState:${req.params.appStateId}`);
      res.send(`appState='${appState}'`);
    });
    await common.loadRouter(
      router,
      common.path(common.__dirname(import.meta.url))
    );
    resolve(router);
  });
};
