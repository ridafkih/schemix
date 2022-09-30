import { schema } from "@/index";
import { PrismaEnum } from "@/modules/PrismaEnum";
import { PrismaModel } from "@/modules/PrismaModel";
import { getCallerFileName } from "@/util/stack";

export function createModel(
  name: string,
  callback: (Model: PrismaModel) => void
): PrismaModel;

export function createModel(
  callback: (Model: PrismaModel) => void
): PrismaModel;

export function createModel(
  param1: string | ((Model: PrismaModel) => void),
  param2?: (Model: PrismaModel) => void
): PrismaModel | undefined {
  if (!schema) throw Error("Schema was not initialized.");

  if (typeof param1 === "string" && typeof param2 === "function") {
    const model = schema.createModel(param1);
    setTimeout(param2, 0, model);
    return model;
  }

  if (typeof param1 === "function" && !param2) {
    const model = schema.createModel(getCallerFileName());
    setTimeout(param1, 0, model);
    return model;
  }
}

export function createEnum(
  name: string,
  callback: (Enum: PrismaEnum) => void
): PrismaEnum;

export function createEnum(callback: (Enum: PrismaEnum) => void): PrismaEnum;

export function createEnum(
  param1: string | ((Enum: PrismaEnum) => void),
  param2?: (Enum: PrismaEnum) => void
): PrismaEnum | undefined {
  if (!schema) throw Error("Schema was not initialized.");

  if (typeof param1 === "string" && typeof param2 === "function") {
    const model = schema.createEnum(param1);
    setTimeout(param2, 0, model);
    return model;
  }

  if (typeof param1 === "function" && !param2) {
    const model = schema.createEnum(getCallerFileName());
    setTimeout(param1, 0, model);
    return model;
  }
}

export function createMixin(
  callback: (Model: PrismaModel) => void
): PrismaModel {
  if (!schema) throw Error("Schema was not initialized.");

  const model = schema.createMixin();
  setTimeout(callback, 0, model);
  return model;
}
