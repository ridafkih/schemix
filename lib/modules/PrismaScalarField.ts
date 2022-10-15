import {
  PrismaFieldAttribute,
  PrismaFieldModifier,
  PrismaFieldTypeName,
} from "typings/prisma-field";

export class PrismaScalarField {
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

  public setAsId() {
    this.attributes.set("id", "@id");
    return this;
  }

  public setUnique() {
    this.attributes.set("unique", "@unique");
    return this;
  }

  public setToUpdatedAt() {
    this.attributes.set("updatedAt", "@updatedAt");
    return this;
  }

  public setDefault(
    defaultValue:
      | string
      | number
      | { cuid: boolean; uuid: boolean; now: boolean }
  ) {
    const setDefaultValue = (value: string) =>
      this.attributes.set("default", `@default(${value})`);
    switch (typeof defaultValue) {
      case "object":
        const [prismaFunc] =
          Object.entries(defaultValue).find(([, value]) => value) || [];
        setDefaultValue(`${prismaFunc}()`);
        break;
      case "string":
        setDefaultValue(`"${defaultValue}"`);
        break;
      default:
        setDefaultValue(defaultValue.toString());
    }

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
      [...attributes.values(), rawAttributeString].join(" "),
    ] as string[];
  }
}
