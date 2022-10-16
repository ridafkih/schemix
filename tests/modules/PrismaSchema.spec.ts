import { PrismaSchema } from "schemix/lib/index";
import { describe, expect, it } from "vitest";

describe("PrismaSchema", () => {
  it("Should expect multiple generators", async () => {
    const schema = new PrismaSchema(
      {
        provider: "cockroachdb",
        url: { env: "DATABASE_URL" },
      },
      [
        {
          provider: "prisma-client-js",
          name: "client",
        },
        {
          provider: "other-client",
          name: "other",
        },
      ]
    );

    const asString = await schema.toString();
    expect(asString).toMatchSnapshot();
  });
});
