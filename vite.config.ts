import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./web"),
    },
  },
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: "template.html",
    },
  },
  server: {
    // proxy: {
    //   "/api": "http://127.0.0.1:3500/",
    // },
  },
});
