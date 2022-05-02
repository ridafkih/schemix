import { PrismaModel } from "@/modules/PrismaModel";
import { PrismaEnum } from "@/modules/PrismaEnum";

import { exportSchema } from "@/util/export";
import { parseKeyValueBlock } from "@/util/blocks";

import { PrismaDataSourceOptions } from "@/@types/prisma-datasource";
import { PrismaGeneratorOptions } from "@/@types/prisma-generator";

export class PrismaSchema {
  private enums: Map<string, PrismaEnum> = new Map();
  private models: Map<string, PrismaModel> = new Map();

  constructor(
    private readonly datasource: PrismaDataSourceOptions,
    private readonly generator: PrismaGeneratorOptions
  ) {}

  /**
   * Parses a datasource block for the schema using the parameters
   * provided in the constructor.
   * @returns A string representing the datasource block.
   */
  private parseDataSource() {
    return parseKeyValueBlock(
      "datasource",
      "database",
      Object.entries(this.datasource)
    );
  }

  /**
   * Parses a generator block for the schema using the parameters
   * provided in the constructor.
   * @returns A string representing the generator block.
   */
  private parseGenerator() {
    return parseKeyValueBlock(
      "generator",
      "client",
      Object.entries(this.generator)
    );
  }

  /**
   * Creates a mixin and automatically attaches it to the schema.
   * @returns The `PrismaModel` object.
   */
  public createMixin() {
    const model = new PrismaModel(this);
    return model;
  }

  /**
   * Creates a `PrismaModel` object and automatically attaches it to the schema.
   * @param modelName The name of the model.
   * @returns The `PrismaModel` object.
   */
  public createModel(modelName: string) {
    const model = new PrismaModel(this, modelName);
    this.models.set(modelName, model);
    return model;
  }

  /**
   * Creates a `PrismaEnum` object and automatically attaches it to the schema.
   * @param enumName The name of the enum.
   * @returns The `PrismaEnum` object.
   */
  public createEnum(enumName: string) {
    const prismaEnum = new PrismaEnum(enumName);
    this.enums.set(enumName, prismaEnum);
    return prismaEnum;
  }

  /**
   * Parses the schema into a singular schema string.
   * @returns Returns a singular schema string.
   */
  public toString() {
    const models = [
      this.parseDataSource(),
      this.parseGenerator(),
      ...this.enums.values(),
      ...this.models.values(),
    ];

    return models.map((model) => model.toString()).join("\n\n") + "\n";
  }

  /**
   * Exports the schema to the provided filepath/filename.
   * @param filepath The target filepath.
   * @param filename The target filename.
   */
  public export(filepath: string, filename: string) {
    exportSchema(filepath, filename, this);
  }
}
