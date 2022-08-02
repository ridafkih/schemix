import { PrismaSchema } from "@/modules/PrismaSchema";

import { PrismaDataSourceOptions } from "@/@types/prisma-datasource";
import {
  PrismaGeneratorOptions,
  PrismaMultiGeneratorOptions,
} from "@/@types/prisma-generator";

interface CreateSchemaOptions {
  datasource: PrismaDataSourceOptions;
  generator: PrismaGeneratorOptions | PrismaMultiGeneratorOptions;
}

/**
 * Create a Prisma schema object.
 * @param props.datasource The datasource object information for Prisma.
 * @param props.generator The generator object information for Prisma.
 * @returns The generated schema object.
 */
export const createSchema = ({ datasource, generator }: CreateSchemaOptions) =>
  new PrismaSchema(datasource, generator);
