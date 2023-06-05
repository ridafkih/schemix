type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export enum PrismaFieldType {
  STRING = "String",
  INTEGER = "Int",
  BIG_INT = "BigInt",
  DECIMAL = "Decimal",
  FLOAT = "Float",
  BOOLEAN = "Boolean",
  DATE_TIME = "DateTime",
  JSON = "Json",
}

export type PrismaFieldTypeName = LiteralUnion<`${PrismaFieldType}`>;

export type PrismaFieldAttribute =
  | "@unique"
  | "@id"
  | "@updatedAt"
  | `@map("${string}")`
  | `@default(${string})`
  | "@ignore";

export type PrismaFieldModifier = "?" | "[]" | "";
