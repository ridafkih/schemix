import { PrismaEnum } from "@/modules/PrismaEnum";
import { PrismaSchema } from "@/modules/PrismaSchema";
import { PrismaEnumField } from "@/modules/PrismaEnumField";
import { PrismaScalarField } from "@/modules/PrismaScalarField";
import { PrismaRelationalField } from "@/modules/PrismaRelationalField";

import {
  handleEnumOptions,
  handleRelationalOptions,
  handleScalarOptions,
} from "@/util/options";
import { parseStringOrObject } from "@/util/parse";

import { PrismaFieldTypeName } from "@/@types/prisma-field";
import {
  BooleanFieldOptions,
  DateTimeFieldOptions,
  EnumFieldOptions,
  FieldOptions,
  FloatFieldOptions,
  IntFieldOptions,
  JsonFieldOptions,
  RelationalFieldOptions,
  StringFieldOptions,
} from "@/@types/prisma-type-options";
import { PrismaEnumOptions } from "@/@types/prisma-enum";

export class PrismaModel {
  private fields: Map<
    string,
    PrismaScalarField | PrismaRelationalField | PrismaEnumField
  > = new Map();
  private blockAttributes: string[] = [];
  private rawFields: string[] = [];

  constructor(
    private readonly schema: PrismaSchema,
    public readonly name?: string
  ) {}

  public string(fieldName: string, options?: StringFieldOptions) {
    return this.createField(fieldName, "String", options);
  }

  public int(fieldName: string, options?: IntFieldOptions) {
    return this.createField(fieldName, "Int", options);
  }

  public bigInt(fieldName: string, options?: IntFieldOptions) {
    return this.createField(fieldName, "BigInt", options);
  }

  public decimal(fieldName: string, options?: IntFieldOptions) {
    return this.createField(fieldName, "Decimal", options);
  }

  public float(fieldName: string, options?: FloatFieldOptions) {
    return this.createField(fieldName, "Float", options);
  }

  public boolean(fieldName: string, options?: BooleanFieldOptions) {
    return this.createField(fieldName, "Boolean", options);
  }

  public dateTime(fieldName: string, options?: DateTimeFieldOptions) {
    return this.createField(fieldName, "DateTime", options);
  }

  public json(fieldName: string, options?: JsonFieldOptions) {
    const parsedDefault = options?.default
      ? parseStringOrObject(options?.default)
      : undefined;

    const newOptions = parsedDefault
      ? ({ ...options, default: parsedDefault } as FieldOptions)
      : options;

    return this.createField(fieldName, "Json", newOptions);
  }

  public enum(
    fieldName: string,
    prismaEnum: PrismaEnum,
    options?: EnumFieldOptions
  ) {
    return this.createEnumField(fieldName, prismaEnum.name, options);
  }

  public relation(
    fieldName: string,
    model: PrismaModel,
    options?: RelationalFieldOptions
  ) {
    return this.createRelation(fieldName, model, options);
  }

  public mixin(model: PrismaModel) {
    [...model.fields.entries()].map(([key, value]) =>
      this.fields.set(key, value)
    );
    return this;
  }

  public raw(fieldText: string) {
    if (fieldText.startsWith("@@")) this.blockAttributes.push(fieldText);
    else this.rawFields.push(fieldText);
    return this;
  }

  public extend(name: string) {
    const clone = this.schema.createModel(name);
    clone.fields = this.fields;
    clone.rawFields = this.rawFields;
    return clone;
  }

  public toString() {
    return [`model ${this.name} {`, this.parseFields(), "}"].join("\n");
  }

  private createRelation(
    fieldName: string,
    model: PrismaModel,
    options: RelationalFieldOptions = {}
  ) {
    if (!model.name) return this;
    const field = new PrismaRelationalField(fieldName, model.name);
    handleRelationalOptions(field, options);
    this.fields.set(fieldName, field);
    return this;
  }

  private createEnumField(
    fieldName: string,
    type: string,
    options: PrismaEnumOptions = {}
  ) {
    const field = new PrismaEnumField(fieldName, type);
    handleEnumOptions(field, options);
    this.fields.set(fieldName, field);
    return this;
  }

  private createField(
    fieldName: string,
    type: PrismaFieldTypeName,
    options: FieldOptions = {}
  ) {
    const field = new PrismaScalarField(fieldName, type);
    handleScalarOptions(field, options);
    this.fields.set(fieldName, field);
    return this;
  }

  private parseFields() {
    const fields = [...this.fields.values()].map((field) =>
      field.toTokenArray()
    );
    const mostTokens = Math.max(...fields.map(({ length }) => length));
    const paddings = Array(mostTokens).fill(0);

    for (let i = 0; i < mostTokens; i++)
      for (const tokens of fields)
        if (!tokens[i]) continue;
        else
          paddings[i] =
            tokens[i].length > paddings[i] ? tokens[i].length : paddings[i];

    return [
      ...fields.map((tokens) => {
        return (
          "  " +
          tokens
            .map((token, index) => token.padEnd(paddings[index]))
            .join(" ")
            .trim()
        );
      }),
      ...this.rawFields.map((rawField) => "  " + rawField),
      ...(this.blockAttributes.length
        ? [
            "",
            ...this.blockAttributes.map(
              (blockAttribute) => "  " + blockAttribute
            ),
          ]
        : []),
    ].join("\n");
  }
}
