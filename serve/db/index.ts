import fs from "fs-extra";
import { ModelCtor } from "sequelize-typescript";

export default () => {
  return new Promise<ModelCtor[]>(async (resolve, reject) => {
    const modlesPath = common.path(
      common.__dirname(import.meta.url),
      "./models"
    );
    const routeList = fs.readdirSync(modlesPath);
    const modles: ModelCtor[] = [];
    for (const key of routeList) {
      modles.push((await import(common.path(modlesPath, key))).default);
    }
    resolve(modles);
  });
};
