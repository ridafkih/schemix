import { createSchema } from "../../dist";

createSchema({
  basePath: __dirname,
  datasource: {
    provider: "postgresql",
    url: { env: "DATABASE_URL" },
  },
  generator: [
    {
      name: "client",
      provider: "prisma-client-js"
    },
    {
      name: "prismaThirdPartyGenerator",
      provider: "prisma-includes-generator",
      seperateRelationFields: true
    }
  ],
}).export(__dirname, "schema");
