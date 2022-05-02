import {
  PrismaFieldAttribute,
  PrismaFieldModifier,
  PrismaFieldTypeName,
} from "@/@types/prisma-field";

export class PrismaRelationalField {
  private relationAttributes: Map<string, string> = new Map();
  private attributes: Map<string, PrismaFieldAttribute> = new Map();
  private modifier: PrismaFieldModifier = "";
  private rawAttributeString = "";

  constructor(
    private readonly name: string,
    private type: PrismaFieldTypeName
  ) {}

  private parseRelationAttribute() {
    const { relationAttributes } = this;
    if (!relationAttributes.size) return;
    const relationString = [...relationAttributes.entries()]
      .map((entries) => entries.join(": "))
      .join(", ");
    return `@relation(${relationString})`;
  }

  public setFields(tokens: string[]) {
    this.relationAttributes.set("fields", `[${tokens.join(", ")}]`);
    return this;
  }

  public setReferences(tokens: string[]) {
    this.relationAttributes.set("references", `[${tokens.join(", ")}]`);
    return this;
  }

  public setOptional() {
    this.modifier = "?";
    return this;
  }

  public setList() {
    this.modifier = "[]";
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
    const parsedRelationAttribute = this.parseRelationAttribute();

    return [
      name,
      type + modifier,
      ...(parsedRelationAttribute ? [parsedRelationAttribute] : []),
      ...[...attributes.values(), rawAttributeString],
    ] as string[];
  }
}
