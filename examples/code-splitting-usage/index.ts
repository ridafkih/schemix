import { join } from "path";
import { createSchema } from "../../dist";

createSchema({
  basePath: __dirname,
  additionalPaths: ["additional"],
  datasource: {
    provider: "postgresql",
    url: { env: "DATABASE_URL" },
  },
  generator: [
    {
      name: "client",
      provider: "prisma-client-js"
    },
  ],
}).export(__dirname, "schema");
