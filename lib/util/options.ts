import { PrismaEnumField } from "@/modules/PrismaEnumField";
import { PrismaScalarField } from "@/modules/PrismaScalarField";
import { PrismaRelationalField } from "@/modules/PrismaRelationalField";

import {
  EnumFieldOptions,
  FieldOptions,
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
    references: "setReferences",
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
    map: "mapTo",
    raw: "setRawAttributes",
  };

  for (const [key, value] of Object.entries(options))
    field[propertyMap[key]]?.(value);
};
