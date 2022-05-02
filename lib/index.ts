import { PrismaSchema } from "@/modules/PrismaSchema"

import { PrismaDataSourceOptions } from "./@types/prisma-datasource";
import { PrismaGeneratorOptions } from "./@types/prisma-generator";

interface CreateSchemaOptions {
	datasource: PrismaDataSourceOptions;
	generator: PrismaGeneratorOptions;
}

export const createSchema = ({
	datasource,
	generator
}: CreateSchemaOptions) =>
	new PrismaSchema(datasource, generator);