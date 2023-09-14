import { Router } from "express";

export default async () => {
  return new Promise<Router>(async (resolve) => {
    const router = Router();

    await common.loadRouter(
      router,
      common.path(common.__dirname(import.meta.url))
    );

    router.use("*", async (req, res) => {
      res.status(404).json({
        code: 404,
        msg: "sorry, this api interface does not exist",
      });
    });
    resolve(router);
  });
};
