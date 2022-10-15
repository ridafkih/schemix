import { PrismaEnumOptions } from "typings/prisma-enum";

export class PrismaEnum {
  private enumMap: Map<string, string | undefined> = new Map();

  constructor(public readonly name: string) {}

  public addValue(value: string, options?: PrismaEnumOptions) {
    this.enumMap.set(value, options?.map);
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

    return [`enum ${this.name} {`, lines, "}"].join("\n");
  }
}
