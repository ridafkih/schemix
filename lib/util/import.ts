import { readdir, stat } from "fs/promises";
import { join } from "path";

const isDirectory = async (fullPath: string): Promise<boolean> => {
  return (await stat(fullPath)).isDirectory();
};

async function asyncFilter<T>(
  arr: T[],
  predicate: (value: T) => Promise<boolean>
): Promise<T[]> {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_, index) => results[index]);
}

const getAllFilesRecursively = async (
  basePath: string,
  folderName: string
): Promise<string[]> => {
  const directoryPath = join(basePath, folderName);

  const fileNames = await readdir(directoryPath);
  const directories = await asyncFilter(fileNames, async (fileName) =>
    isDirectory(join(directoryPath, fileName))
  );
  const files = fileNames
    .filter((fileName) => !directories.includes(fileName))
    .map((file) => join(directoryPath, file));

  const filesInDirectories = (
    await Promise.all(
      directories.map((directory) =>
        getAllFilesRecursively(directoryPath, directory)
      )
    )
  ).flat();

  return [...filesInDirectories, ...files];
};

export const importAllFiles = async (basePath: string, folderName: string) => {
  return getAllFilesRecursively(basePath, folderName)
    .then((files) => Promise.all(files.map((fileName) => import(fileName))))
    .catch(console.error);
};
