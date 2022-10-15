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
});
