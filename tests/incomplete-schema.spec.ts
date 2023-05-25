import { join } from "path";
import { createSchema } from "schemix";
import { describe, expect, it } from "vitest";

describe("index", () => {
  it("should allow the generation of schemas which don't have certain folders (models/, mixins/, enums/) defined", async () => {
    const schema = createSchema({
      basePath: join(__dirname, "__schema__"),
      additionalPaths: [join(__dirname, "__incomplete_schema__")],
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
