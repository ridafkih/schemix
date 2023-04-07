import {
  PrismaFieldAttribute,
  PrismaFieldModifier,
  PrismaFieldTypeName,
} from "typings/prisma-field";
import { Comment } from "typings/prisma-type-options";

export class PrismaRelationalField {
  private relationAttributes: Map<string, string> = new Map();
  private attributes: Map<string, PrismaFieldAttribute> = new Map();
  private modifier: PrismaFieldModifier = "";
  private rawAttributeString = "";
  private comments: Comment[] = [];

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

  public setName(targetName: string) {
    this.relationAttributes.set("name", `"${targetName}"`);
    return this;
  }

  public setReferences(tokens: string[]) {
    this.relationAttributes.set("references", `[${tokens.join(", ")}]`);
    return this;
  }

  public setOnDelete(action: string) {
    this.relationAttributes.set("onDelete", action);
    return this;
  }

  public setOnUpdate(action: string) {
    this.relationAttributes.set("onUpdate", action);
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

  public setComments(comments: Comment[]) {
    this.comments = comments;
    return this;
  }

  public toFieldData() {
    return {
      comments: this.comments,
      tokens: this.toTokenArray(),
    };
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
