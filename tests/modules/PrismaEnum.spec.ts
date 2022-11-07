import { describe, expect, it } from "vitest";
import { PrismaEnum } from "schemix/lib/modules/PrismaEnum";

describe("PrismaEnum", () => {
  it("Should support setting the name of a PrismaEnum", () => {
    const foodEnum = new PrismaEnum("Food");
    expect(foodEnum.name).toBe("Food");
  });
  it("Should support adding enum values", async () => {
    const avengersEnum = new PrismaEnum("Avengers")
      .addValue("THOR")
      .addValue("IRON_MAN")
      .addValue("CAPTAIN_AMERICA")
      .addValue("BLACK_WIDOW")
      .addValue("HULK");

    const asString = await avengersEnum.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should allow importing JS/TS enums through `fromJSEnum`", async () => {
    enum AvengersEnum {
      THOR,
      IRON_MAN,
      CAPTAIN_AMERICA,
      BLACK_WIDOW,
      HULK,
    }

    const avengersEnum = new PrismaEnum("Avengers").fromJSEnum(AvengersEnum);
    const asString = await avengersEnum.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should allow mapping values through `fromJSEnum`", async () => {
    enum AvengersNameAcronymEnum {
      THOR = "TO",
      IRON_MAN = "TS",
      CAPTAIN_AMERICA = "SR",
      BLACK_WIDOW = "NR",
      HULK = "BB",
    }

    const avengersNameAcronymEnum = new PrismaEnum("Avengers").fromJSEnum(
      AvengersNameAcronymEnum
    );

    const asString = await avengersNameAcronymEnum.toString();
    expect(asString).toMatchSnapshot();
  });
});
