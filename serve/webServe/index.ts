import { Router } from "express";

export default async () => {
    return new Promise<Router>(async (resolve) => {
        const router = Router();
        await (await import(`./${process.env.NODE_ENV}.js`)).server(router)
        resolve(router);
    });
};
