import path from "path";
import fs from "fs";

import { PrismaSchema } from "@/modules/PrismaSchema";

/**
 * Exports the schema to a path relative to the current working directory.
 * @param filepath The filepath of the target file.
 * @param filename The filename of the target file (should not include `.prisma` extension).
 * @param schema The `PrismaSchema` object.
 */
export const exportSchema = (
  filepath: string,
  filename: string,
  schema: PrismaSchema
) => {
  fs.writeFileSync(
    path.join(process.cwd(), filepath, `${filename}.prisma`),
    schema.toString(),
    "utf-8"
  );
};
