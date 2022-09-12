import { createModel } from "../../../dist";
import UUIDMixin from "../../mixins/UUID.mixin";
import UserModel from "../../models/User.model";

export default createModel((AuthModel) => {
  AuthModel
    .mixin(UUIDMixin)
    .string("hash")
    .string("salt")
    .relation("user", UserModel, { fields: ["userId"], references: ["email"] })
    .string("userId", { unique: true });
});