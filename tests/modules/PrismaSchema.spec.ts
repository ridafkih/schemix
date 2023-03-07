import { PrismaSchema } from "schemix/lib/index";
import { describe, expect, it } from "vitest";

describe("PrismaSchema", () => {
  it("Should accept multiple generators", async () => {
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
  it("Should accept extensions", async () => {
    const schema = new PrismaSchema(
      {
        provider: "postgresql",
        url: { env: "DATABASE_URL" },
        extensions: ["pg_tgrm", "zombodb"],
      },
      {
        provider: "prisma-client-js",
      }
    );

    const asString = await schema.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should support shadowDatabaseUrl with environment variables", async () => {
    const schema = new PrismaSchema(
      {
        provider: "postgresql",
        url: { env: "DATABASE_URL" },
        shadowDatabaseUrl: { env: "SHADOW_DATABASE_URL" },
      },
      {
        provider: "prisma-client-js",
      }
    );

    const asString = await schema.toString();
    expect(asString).toMatchSnapshot();
  });
});
