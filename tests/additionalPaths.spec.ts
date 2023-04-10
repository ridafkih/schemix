import { createSchema } from "schemix";
import { describe, expect, it } from "vitest";

describe("index", () => {
  it("should allow compiling schemas from multiple folders with additionalPaths", async () => {
    const schema = createSchema({
      basePath: `${__dirname}/__schema__`,
      additionalPaths: ["../__additional_schema__/"],
      datasource: {
        provider: "cockroachdb",
        url: { env: "DATABASE_URL" },
      },
      generator: {
        provider: "prisma-client-js",
      },
    });

    const asString = await schema.toString();
    expect(asString).toMatchSnapshot();
  });
});
