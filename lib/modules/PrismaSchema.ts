import { PrismaModel } from "modules/PrismaModel";
import { PrismaEnum } from "modules/PrismaEnum";

import { exportSchema } from "util/export";
import { parseKeyValueBlock } from "util/blocks";

import { PrismaDataSourceOptions } from "typings/prisma-datasource";
import {
  PrismaGeneratorOptions,
  PrismaMultiGeneratorOptions,
} from "typings/prisma-generator";
import { importAllFiles } from "util/import";

export class PrismaSchema {
  private enums: Map<string, PrismaEnum> = new Map();
  private models: Map<string, PrismaModel> = new Map();

  constructor(
    datasource: PrismaDataSourceOptions,
    generator: PrismaGeneratorOptions | PrismaMultiGeneratorOptions
  );
  constructor(
    datasource: PrismaDataSourceOptions,
    generator: PrismaGeneratorOptions | PrismaMultiGeneratorOptions,
    basePath: string
  );
  constructor(
    datasource: PrismaDataSourceOptions,
    generator: PrismaGeneratorOptions | PrismaMultiGeneratorOptions,
    basePath: string,
    additionalPaths: string[]
  );
  constructor(
    private readonly datasource: PrismaDataSourceOptions,
    private readonly generator:
      | PrismaGeneratorOptions
      | PrismaMultiGeneratorOptions,
    private readonly basePath?: string,
    private readonly additionalPaths?: string[]
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
    const generators = Array.isArray(this.generator)
      ? this.generator
      : [this.generator];

    return generators
      .map(({ name = "client", ...generator }) =>
        parseKeyValueBlock(
          "generator",
          name,
          Object.entries(generator) as [string, string | string[]][]
        )
      )
      .join("\n\n");
  }

  /**
   * Creates a mixin and automatically attaches it to the schema.
   * @returns The `PrismaModel` object.
   */
  public createMixin() {
    const model = new PrismaModel(null, this);
    return model;
  }

  /**
   * Creates a `PrismaModel` object and automatically attaches it to the schema.
   * @param modelName The name of the model.
   * @returns The `PrismaModel` object.
   */
  public createModel(modelName: string) {
    const model = new PrismaModel(modelName, this);
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
  public toString(): Promise<string> {
    return new Promise(async (resolve) => {
      if (this.basePath) {
        await importAllFiles(this.basePath, "enums");
        await importAllFiles(this.basePath, "models");
        await importAllFiles(this.basePath, "mixins");
      }

      if (this.additionalPaths) {
        await Promise.all(
          this.additionalPaths.map(async (path) => {
            await importAllFiles(path, "enums");
            await importAllFiles(path, "models");
            await importAllFiles(path, "mixins");
          })
        );
      }

      process.nextTick(() => {
        const models = [
          this.parseDataSource(),
          this.parseGenerator(),
          ...this.enums.values(),
          ...this.models.values(),
        ];

        Promise.all(models.map((model) => model.toString())).then(
          (stringModels) => {
            const schemaString = stringModels.join("\n\n") + "\n";
            resolve(schemaString);
          }
        );
      });
    });
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
