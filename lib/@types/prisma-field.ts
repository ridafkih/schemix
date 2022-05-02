type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export enum PrismaFieldType {
	STRING = "String",
	INTEGER = "Int",
	FLOAT = "Float",
	BOOLEAN = "Boolean",
	DATE_TIME = "DateTime"
}

export type PrismaFieldTypeName = LiteralUnion<`${PrismaFieldType}`>;

export type PrismaFieldAttribute = "@unique" | "@id" | "@updatedAt" | `@map("${string}")` | `@default(${string})`;

export type PrismaFieldModifier = "?" | "[]" | "";