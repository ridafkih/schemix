import { describe, expect, it } from "vitest";
import { PrismaEnumField } from "schemix/lib/modules/PrismaEnumField";

const fieldTypes = [
  "BigInt",
  "Boolean",
  "DateTime",
  "Decimal",
  "Float",
  "Int",
  "Json",
  "String",
];

describe("PrismaEnumField", () => {
  it("Should support creating each type of field", () => {
    const fields = fieldTypes.map((type) => {
      const name = type.toLowerCase();
      return new PrismaEnumField(name, type);
    });

    const fieldAsString = fields.map((field) => field.toTokenArray());
    expect(fieldAsString).toMatchSnapshot();
  });
  it("Should support making fields optional", () => {
    const field = new PrismaEnumField("points", "Int").setOptional();
    const [, token] = field.toTokenArray();
    expect(token).toBe("Int?");
  });
  it("Should support mapping fields", () => {
    const field = new PrismaEnumField("points", "Int").mapTo("points_map");
    expect(field.toTokenArray()).includes('@map("points_map")');
  });
  it("Should support setting default values", () => {
    const field = new PrismaEnumField("points", "Int").setDefault("3");
    expect(field.toTokenArray()).includes("@default(3)");
  });
  it("Should support setting field to list", () => {
    const field = new PrismaEnumField("points", "Int").setList();
    expect(field.toTokenArray()).includes("Int[]");
  });
  it("Should support setting field to be unique", () => {
    const field = new PrismaEnumField("points", "Int").setUnique();
    expect(field.toTokenArray()).includes("@unique");
  });
  it("Should support setting raw attributes.", () => {
    const field = new PrismaEnumField("points", "Int").setRawAttributes(
      "@database.VarChar(255)"
    );
    expect(field.toTokenArray()).includes("@database.VarChar(255)");
  });
  it("Should support multiple modifiers at once", () => {
    const field = new PrismaEnumField("points", "Int")
      .mapTo("points_map")
      .setDefault("3")
      .setRawAttributes("@database.VarChar(255)");

    expect(field.toTokenArray())
      .includes("@default(3)")
      .and.includes('@map("points_map")')
      .and.includes("@database.VarChar(255)");
  });
});
