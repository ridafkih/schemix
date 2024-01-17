import { PrismaEnumField } from "modules/PrismaEnumField";
import { PrismaScalarField } from "modules/PrismaScalarField";
import { PrismaRelationalField } from "modules/PrismaRelationalField";

import {
  CompositeIDFieldOptions,
  CompositeUniqueFieldOptions,
  CompositeUniqueFields,
  EnumFieldOptions,
  FieldOptions,
  ModelMapOptions,
  RelationalFieldOptions,
} from "typings/prisma-type-options";

const scalarPropertyMap: Record<string, keyof PrismaScalarField> = {
  id: "setAsId",
  optional: "setOptional",
  list: "setList",
  unique: "setUnique",
  default: "setDefault",
  map: "mapTo",
  updatedAt: "setToUpdatedAt",
  raw: "setRawAttributes",
  comments: "setComments",
  ignore: "setIgnore",
};

/**
 * Manipulates the `PrismaScalarField` based on the options provided.
 * @param field THe prisma scalar field object.
 * @param options The options object.
 */
export const handleScalarOptions = <T extends FieldOptions>(
  field: PrismaScalarField,
  options: T
) => {
  const keyBlacklist: string[] = ["precision"];

  for (const [key, value] of Object.entries(options)) {
    if (!keyBlacklist.includes(key)) field[scalarPropertyMap[key]](value);
  }
};

const relationalPropertyMap: Record<string, keyof PrismaRelationalField> = {
  optional: "setOptional",
  list: "setList",
  map: "setMap",
  fields: "setFields",
  name: "setName",
  references: "setReferences",
  onDelete: "setOnDelete",
  onUpdate: "setOnUpdate",
  raw: "setRawAttributes",
  comments: "setComments",
};

/**
 * Manipulates the `PrismaRelationField` based on the options provided.
 * @param field The prisma relational field object.
 * @param options The options object.
 */
export const handleRelationalOptions = <T extends RelationalFieldOptions>(
  field: PrismaRelationalField,
  options: T
) => {
  for (const [key, value] of Object.entries(options))
    field[relationalPropertyMap[key]]?.(value);
};

const enumMap: Record<string, keyof PrismaEnumField> = {
  default: "setDefault",
  optional: "setOptional",
  list: "setList",
  unique: "setUnique",
  map: "mapTo",
  raw: "setRawAttributes",
  comments: "setComments",
};

/**
 * Manipulates the `PrismaEnumField` based on the options provided.
 * @param field The prisma enum field object.
 * @param options The options object.
 */
export const handleEnumOptions = <T extends EnumFieldOptions>(
  field: PrismaEnumField,
  options: T
) => {
  for (const [key, value] of Object.entries(options))
    field[enumMap[key]]?.(value);
};

export const buildCompositeId = (options: CompositeIDFieldOptions) => {
  const fields = `[${options.fields.join(", ")}]`;
  if (!options.map && !options.name) return `@@id(${fields})`;

  const referenceArguments: [string, string][] = [["fields", fields]];
  if (options.map) referenceArguments.push(["map", options.map]);
  if (options.name) referenceArguments.push(["name", options.name]);

  const parsedArguments: string = referenceArguments
    .map(([property, value]) => `${property}: ${value}`)
    .join(", ");

  return `@@id(${parsedArguments})`;
};

const isCompositeUniqueFields = (
  options: CompositeUniqueFieldOptions
): options is CompositeUniqueFields => Array.isArray(options);
export const buildCompositeUnique = (options: CompositeUniqueFieldOptions) => {
  if (isCompositeUniqueFields(options)) {
    return `@@unique([${options.join(", ")}])`;
  }

  const fields = `[${options.fields.join(", ")}]`;
  const args: string[] = [fields];

  if (options.map) {
    args.push(`map: \"${options.map}\"`);
  }

  const parsedArguments: string = args.join(", ");

  return `@@unique(${parsedArguments})`;
};

export const buildModelMap = (options: ModelMapOptions) => {
  const name = typeof options === "string" ? options : options.name;
  return `@@map("${name}")`;
};
