export enum PrismaBlockType {
	GENERATOR = "generator",
	DATA_SOURCE = "datasource",
	MODEL = "model",
	ENUM = "enum"
};

export type PrismaBlockName = `${PrismaBlockType}`;