import { PrismaEnumField } from "@/modules/PrismaEnumField";
import { PrismaScalarField } from "@/modules/PrismaScalarField";
import { PrismaRelationalField } from "@/modules/PrismaRelationalField";

import {
  CompositeIDFieldOptions,
  CompositeUniqueFieldOptions,
  CompositeUniqueOptions,
  EnumFieldOptions,
  FieldOptions,
  ModelMapOptions,
  RelationalFieldOptions,
} from "@/@types/prisma-type-options";

/**
 * Manipulates the `PrismaScalarField` based on the options provided.
 * @param field THe prisma scalar field object.
 * @param options The options object.
 */
export const handleScalarOptions = <T extends FieldOptions>(
  field: PrismaScalarField,
  options: T
) => {
  const propertyMap: Record<string, keyof PrismaScalarField> = {
    id: "setAsId",
    optional: "setOptional",
    list: "setList",
    unique: "setUnique",
    default: "setDefault",
    map: "mapTo",
    updatedAt: "setToUpdatedAt",
    raw: "setRawAttributes",
  };

  for (const [key, value] of Object.entries(options))
    field[propertyMap[key]](value);
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
  const propertyMap: Record<string, keyof PrismaRelationalField> = {
    optional: "setOptional",
    list: "setList",
    map: "mapTo",
    fields: "setFields",
    name: "setName",
    references: "setReferences",
    onDelete: "setOnDelete",
    onUpdate: "setOnUpdate",
    raw: "setRawAttributes",
  };

  for (const [key, value] of Object.entries(options))
    field[propertyMap[key]]?.(value);
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
  const propertyMap: Record<string, keyof PrismaEnumField> = {
    default: "setDefault",
    optional: "setOptional",
    list: "setList",
    unique: "setUnique",
    map: "mapTo",
    raw: "setRawAttributes",
  };

  for (const [key, value] of Object.entries(options))
    field[propertyMap[key]]?.(value);
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

const isCompositeUniqueOptions = (options: CompositeUniqueFieldOptions): options is CompositeUniqueOptions => typeof options === "object"
export const buildCompositeUnique = (options: CompositeUniqueFieldOptions) => {
  if (isCompositeUniqueOptions(options)) {
    const fields = `[${options.fields.join(", ")}]`;
    const args: string[] = [fields]
    if (options.map) {
      args.push(`map: ${options.map}`);
    }
    const parsedArguments: string = args
    .join(", ");
    return `@@unique(${parsedArguments})`;
  } else {
    return `@@unique([${options.join(", ")}])`;
  }

  
  
}

export const buildModelMap = (options: ModelMapOptions) => {
  const name = typeof options === 'string' ? options : options.name;
  return `@@map("${name}")`;
};
