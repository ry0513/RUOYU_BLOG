import fs from "fs-extra";
import express, { Router } from "express";

export const server = (router: Router) => {
  return new Promise(async (resolve) => {
    router.use(express.static("dist/client", { index: false }));
    router.get("*", async (req, res) => {
      const url = req.originalUrl;

      const ssrContext = { req, res };
      const template = fs.readFileSync(
        common.path("root", "dist/client/template.html"),
        "utf-8"
      );
      const render = (
        await import(common.path("root", "dist/server/entry-server.js"))
      ).render;
      const { appHtml, preloadLinks, appState, headTags } = await render({
        url,
        ssrContext,
        manifest: JSON.parse(
          fs.readFileSync(
            common.path("root", "dist/client/ssr-manifest.json"),
            "utf-8"
          )
        ),
      });
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--app-state-->`, appState)
        .replace("<!--head-tags-->", headTags);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    });
    resolve(true);
  });
};
