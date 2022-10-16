import { join } from "path";
import { createSchema } from "schemix";
import { describe, expect, it } from "vitest";

describe("index", () => {
  it("Should allow to create schemas from a pre-defined folder structure", async () => {
    const schema = createSchema({
      datasource: {
        provider: "cockroachdb",
        url: { env: "DATABASE_URL" },
      },
      generator: {
        provider: "prisma-client-js",
      },
      basePath: join(__dirname, "__schema__"),
    });

    const asString = await schema.toString();
    expect(asString).toMatchSnapshot();
  });
});
