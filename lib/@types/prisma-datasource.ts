export type PrismaDataSourceProvider =
  | "postgresql"
  | "mysql"
  | "sqlite"
  | "sqlserver"
  | "mongodb"
  | "cockroachdb";

export type PrismaDataSourceReferentialIntegrity = "foreignKeys" | "prisma";

export interface PrismaDataSourceOptions {
  provider: PrismaDataSourceProvider;
  url:
    | string
    | {
        env: string;
      };
  shadowDatabaseUrl?: string;
  referentialIntegrity?: PrismaDataSourceReferentialIntegrity;
}
