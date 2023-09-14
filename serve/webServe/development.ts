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
        const ssrContext = { req, res };
        const template = await vite.transformIndexHtml(
          url,
          fs.readFileSync(common.path("root", "template.html"), "utf-8")
        );
        const render = (
          await vite.ssrLoadModule(common.path("root", "web/entry-server.ts"))
        ).render;
        const { appHtml, preloadLinks, appState, headTags } = await render({
          url,
          ssrContext,
        });
        const html = template
          .replace(`<!--preload-links-->`, preloadLinks)
          .replace(`<!--app-html-->`, appHtml)
          .replace(`<!--app-state-->`, appState)
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
