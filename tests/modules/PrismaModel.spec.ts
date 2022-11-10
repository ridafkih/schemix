import { describe, expect, it } from "vitest";
import { PrismaModel } from "schemix/lib/modules/PrismaModel";
import { PrismaEnum } from "schemix/lib/modules/PrismaEnum";

const scalarFieldTypes = [
  "string",
  "int",
  "bigInt",
  "decimal",
  "float",
  "boolean",
  "dateTime",
  "json",
];

describe("PrismaModel", () => {
  it("Should support setting the model name", () => {
    const model = new PrismaModel("Model");
    expect(model.name).toBe("Model");
  });
  it("Should support every scalar field type", async () => {
    const model = new PrismaModel("Model").string("id", {
      default: { uuid: true },
      id: true,
    });

    for (const scalarFieldType of scalarFieldTypes)
      model[scalarFieldType](scalarFieldType);

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should support adding fields", async () => {
    const model = new PrismaModel("User")
      .string("id", {
        default: { uuid: true },
        id: true,
      })
      .string("email", { optional: true });

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should support adding unique constraints", async () => {
    const model = new PrismaModel("User")
      .string("id", { default: { uuid: true }, id: true })
      .string("email")
      .string("phoneNumber")
      .unique(["email", "phoneNumber"]);

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should support adding a map", async () => {
    const model = new PrismaModel("User")
      .string("id", { default: { uuid: true }, id: true })
      .map("normal_user");

    const asString = await model.toString();
    expect(asString).toMatchSnapshot(asString);
  });
  it("Should allow adding a composite id attribute", async () => {
    const model = new PrismaModel("User")
      .string("email")
      .id({ fields: ["email"] });

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should allow setting @updatedAt and @default(now()) on DateTime fields", async () => {
    const model = new PrismaModel("User")
      .string("id", { default: { uuid: true }, id: true })
      .dateTime("updatedAt", { updatedAt: true })
      .dateTime("createdAt", { default: { now: true } });

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should allow setting defaults for Json fields", async () => {
    const model = new PrismaModel("User")
      .string("id", { default: { uuid: true }, id: true })
      .json("json", { default: { isJson: true } });

    const asString = await model.toString();
    expect(asString).toMatchSnapshot(asString);
  });
  it("Should allow appending raw attributes", async () => {
    const model = new PrismaModel("Ambiguous")
      .string("id", { default: { uuid: true }, id: true })
      .raw('@@map("normal_user")');

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should allow appending raw fields", async () => {
    const model = new PrismaModel("Ambiguous")
      .string("id", { default: { uuid: true }, id: true })
      .raw("email String?");

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should support adding enum values", async () => {
    const enumValues = new PrismaEnum("Beans")
      .addValue("GREEN")
      .addValue("NOT_GREEN");

    const model = new PrismaModel("Farm")
      .string("id", { default: { uuid: true }, id: true })
      .enum("beans", enumValues);

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should support adding mixins", async () => {
    const uuidMixin = new PrismaModel().string("id", {
      default: { uuid: true },
      id: true,
    });

    const model = new PrismaModel("User")
      .mixin(uuidMixin)
      .string("email")
      .string("phoneNumber");

    const asString = await model.toString();
    expect(asString).toMatchSnapshot(asString);
  });
  it("Should support using raw fields with mixins", async () => {
    const emailMixin = new PrismaModel()
      .string("email")
      .raw("@@index([email])");

    const model = new PrismaModel("User")
      .string("id", { default: { uuid: true }, id: true })
      .mixin(emailMixin)
      .string("phoneNumber");

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should allow extending models", async () => {
    const base = new PrismaModel().string("id", {
      default: { uuid: true },
      id: true,
    });
    const model = base.extend("User").string("email").string("phoneNumber");

    const asString = await model.toString();
    expect(asString).toMatchSnapshot();
  });
  it("Should allow relations", async () => {
    const postModel = new PrismaModel("Post");
    const userModel = new PrismaModel("User");

    postModel
      .string("id", { default: { uuid: true }, id: true })
      .string("content")
      .relation("author", userModel, {
        fields: ["authorId"],
        references: ["id"],
        optional: true,
      })
      .string("authorId", { optional: true });

    userModel
      .string("id", { default: { uuid: true }, id: true })
      .relation("posts", postModel, { list: true });

    const postModelAsString = await postModel.toString();
    const userModelAsString = await userModel.toString();

    expect(postModelAsString).toMatchSnapshot();
    expect(userModelAsString).toMatchSnapshot();
  });
});
