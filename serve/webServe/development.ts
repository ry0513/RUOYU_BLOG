import fs from "fs-extra";
import { Router } from "express";
import { createServer as createViteServer } from "vite";

export const server = (router: Router) => {
  return new Promise(async (resolve) => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    router.use(vite.middlewares);
    router.get("*", async (req, res) => {
      const url = req.originalUrl;
      try {
        const template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(common.path("root", "template.html"), "utf-8")
        );
        const render = (
          await vite.ssrLoadModule(common.path("root", "web/entry-server.ts"))
        ).render;
        const { appHtml, preloadLinks, headTags } = await render({
          url,
          common,
        });
        const html = template
          .replace(`<!--preload-links-->`, preloadLinks)
          .replace(`<!--app-html-->`, appHtml)
          .replace("<!--head-tags-->", headTags);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e: any) {
        vite && vite.ssrFixStacktrace(e);
        res.status(500).end(e.stack);
      }
    });
    resolve(true);
  });
};
