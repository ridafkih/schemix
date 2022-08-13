import { readdir } from "fs/promises";
import { join } from "path";

export const importAllFiles = async (basePath: string, folderName: string) => {
  const directoryPath = join(basePath, folderName);
  return readdir(directoryPath)
    .then((fileNames) => {
      const promises = fileNames.map(
        (fileName) => import(join(basePath, folderName, fileName))
      );

      return Promise.all(promises);
    })
    .catch(() => void 0);
};
