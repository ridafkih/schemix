import { PrismaSchema } from "@/modules/PrismaSchema";

import { PrismaDataSourceOptions } from "@/@types/prisma-datasource";
import {
  PrismaGeneratorOptions,
  PrismaMultiGeneratorOptions,
} from "@/@types/prisma-generator";

type PrivateSchema = Omit<
  PrismaSchema,
  "createMixin" | "createEnum" | "createModel"
>;

interface CreateSchemaOptions {
  datasource: PrismaDataSourceOptions;
  generator: PrismaGeneratorOptions | PrismaMultiGeneratorOptions;
  basePath?: string;
}

export let schema: PrismaSchema | undefined;

/**
 * Create a Prisma schema object.
 * @param props.datasource The datasource object information for Prisma.
 * @param props.generator The generator object information for Prisma.
 * @param props.basePath The base path for the schema object, optional if you want a purely programmatically generated schema.
 * @returns The generated schema object.
 */
export const createSchema = <T extends CreateSchemaOptions>({
  datasource,
  generator,
  basePath,
}: T): T["basePath"] extends string ? PrivateSchema : PrismaSchema => {
  if (typeof basePath === "string")
    return new PrismaSchema(datasource, generator, basePath);
  else return new PrismaSchema(datasource, generator);
};

export { createMixin, createEnum, createModel } from "@/util/create";
export { PrismaModel } from "@/modules/PrismaModel";
export { PrismaEnum } from "@/modules/PrismaEnum";
export { PrismaSchema };
