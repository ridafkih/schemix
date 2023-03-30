import { schema } from "../";
import { getCallerFileName } from "util/stack";
import type { PrismaModel } from "modules/PrismaModel";

export function extendModel(
  model: PrismaModel,
  name: string,
  callback: (Model: PrismaModel) => void
): PrismaModel;

export function extendModel(
  model: PrismaModel,
  callback: (Model: PrismaModel) => void
): PrismaModel;

export function extendModel(
  model: PrismaModel,
  param1: string | ((Model: PrismaModel) => void),
  param2?: (Model: PrismaModel) => void
): PrismaModel | undefined {
  if (!schema) throw Error("Schema was not initialized.");

  if (typeof param1 === "string" && typeof param2 === "function") {
    const extendedModel = model.extend(param1);
    setImmediate(param2, extendedModel);
    return extendedModel;
  }

  if (typeof param1 === "function" && !param2) {
    const extendedModel = model.extend(getCallerFileName());
    setImmediate(param1, extendedModel);
    return extendedModel;
  }
}
