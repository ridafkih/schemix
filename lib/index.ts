import { PrismaSchema } from "@/modules/PrismaSchema";

import { PrismaDataSourceOptions } from "@/@types/prisma-datasource";
import {
  PrismaGeneratorOptions,
  PrismaMultiGeneratorOptions,
} from "@/@types/prisma-generator";

type PrivateSchema = Omit<PrismaSchema, "createMixin" | "createEnum" | "createModel">;

interface CreateSchemaOptions {
  basePath: string;
  datasource: PrismaDataSourceOptions;
  generator: PrismaGeneratorOptions | PrismaMultiGeneratorOptions;
}

export let schema: PrismaSchema | undefined;

/**
 * Create a Prisma schema object.
 * @param props.datasource The datasource object information for Prisma.
 * @param props.generator The generator object information for Prisma.
 * @returns The generated schema object.
 */
export const createSchema = ({ basePath, datasource, generator }: CreateSchemaOptions) => {
  schema = new PrismaSchema(basePath, datasource, generator);
  return schema as PrivateSchema;
}

export { createMixin, createEnum, createModel } from "@/util/create";