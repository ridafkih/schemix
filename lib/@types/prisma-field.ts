export enum PrismaFieldType {
	STRING = "String",
	INTEGER = "Int",
	FLOAT = "Float",
	BOOLEAN = "Boolean",
	DATE_TIME = "DateTime"
}

export type PrismaFieldTypeName = `${PrismaFieldType}`;

export type PrismaFieldAttribute = "@unique" | "@id" | "@updatedAt" | `@map("${string}")` | `@default(${string})`;

export type PrismaFieldModifier = "?" | "[]" | "";