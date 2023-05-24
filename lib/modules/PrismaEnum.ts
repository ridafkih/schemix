import { PrismaEnumOptions } from "typings/prisma-enum";
import { ModelMapOptions } from "typings/prisma-type-options";
import { buildModelMap } from "util/options";

export class PrismaEnum {
  private enumMap: Map<string, string | undefined> = new Map();
  private blockAttributes: string[] = [];

  constructor(public readonly name: string) {}

  public addValue(value: string, options?: PrismaEnumOptions) {
    this.enumMap.set(value, options?.map);
    return this;
  }

  public map(options: ModelMapOptions) {
    this.blockAttributes.push(buildModelMap(options));
    return this;
  }

  public toString() {
    const { enumMap } = this;
    const entries = [...enumMap.entries()];

    const padding = entries.reduce((accumulator: number, [{ length }]) => {
      return length > accumulator ? length : accumulator;
    }, 0);

    const lines = entries
      .map(([key, value]) => {
        if (!value) return `  ${key}`;
        return "  " + [key.padEnd(padding), ` @map("${value}")`].join(" ");
      })
      .join("\n");

    return [
      `enum ${this.name} {`,
      lines,
      ...(this.blockAttributes.length
        ? [
            "",
            ...this.blockAttributes.map(
              (blockAttribute) => "  " + blockAttribute
            ),
          ]
        : []),
      "}",
    ].join("\n");
  }
}
