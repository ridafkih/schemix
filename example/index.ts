import { createSchema } from "../dist";

createSchema({
  basePath: __dirname,
  datasource: {
    provider: "postgresql",
    url: { env: "DATABASE_URL" },
  },
  generator: {
    provider: "prisma-client-js",
  },
}).export(__dirname, "schema");
