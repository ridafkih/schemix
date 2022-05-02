import path from "path";
import fs from "fs";

import { PrismaSchema } from "@/modules/PrismaSchema";

export const exportSchema = (filepath: string, filename: string, schema: PrismaSchema) => {
	return fs.writeFileSync(path.join(process.cwd(), filepath, `${filename}.prisma`), schema.toString(), "utf-8");
}