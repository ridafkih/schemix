export type PrismaDataSourceProvider =
  | "postgresql"
  | "mysql"
  | "sqlite"
  | "sqlserver"
  | "mongodb"
  | "cockroachdb";

export type PrismaDataSourceRelationMode = "foreignKeys" | "prisma";

export interface PrismaDataSourceOptions {
  provider: PrismaDataSourceProvider;
  url:
    | string
    | {
        env: string;
      };
  directUrl?:
    | string
    | {
        env: string;
      };
  shadowDatabaseUrl?:
    | string
    | {
        env: string;
      };
  extensions?: string[];
  referentialIntegrity?: PrismaDataSourceRelationMode;
  relationMode?: PrismaDataSourceRelationMode;
}
