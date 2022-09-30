import { buildCompositeUnique } from "./options";

describe("buildCompositeUnique", () => {
  describe("with fields array", () => {
    it("should return correct composite unique value", () => {
      expect(buildCompositeUnique(["apple", "banana"])).toBe(
        "@@unique([apple, banana])"
      );
    });
  });

  describe("with options object", () => {
    describe("without map", () => {
      it("should return correct composite unique value", () => {
        expect(buildCompositeUnique({ fields: ["apple", "banana"] })).toBe(
          "@@unique([apple, banana])"
        );
      });
    });

    describe("with map", () => {
      it("should return correct composite unique value", () => {
        expect(
          buildCompositeUnique({
            fields: ["apple", "banana"],
            map: "apple_banana_unique_contraint",
          })
        ).toBe(
          '@@unique([apple, banana], map: "apple_banana_unique_contraint")'
        );
      });
    });
  });
});
