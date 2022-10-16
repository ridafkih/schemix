import {
  PrismaFieldAttribute,
  PrismaFieldModifier,
  PrismaFieldTypeName,
} from "typings/prisma-field";

export class PrismaEnumField {
  private attributes: Map<string, PrismaFieldAttribute> = new Map();
  private modifier: PrismaFieldModifier = "";
  private rawAttributeString = "";

  constructor(
    private readonly name: string,
    private type: PrismaFieldTypeName
  ) {}

  public setOptional() {
    this.modifier = "?";
    return this;
  }

  public setList() {
    this.modifier = "[]";
    return this;
  }

  public setUnique() {
    this.attributes.set("unique", "@unique");
    return this;
  }

  public setDefault(defaultValue: string) {
    this.attributes.set("default", `@default(${defaultValue})`);
    return this;
  }

  public mapTo(fieldName: string) {
    this.attributes.set("map", `@map("${fieldName}")`);
    return this;
  }

  public setRawAttributes(rawAttributeString: string) {
    this.rawAttributeString = rawAttributeString;
    return this;
  }

  public toTokenArray() {
    const { name, type, modifier, attributes, rawAttributeString } = this;

    return [
      name,
      type + modifier,
      ...[...attributes.values(), rawAttributeString],
    ] as string[];
  }
}
