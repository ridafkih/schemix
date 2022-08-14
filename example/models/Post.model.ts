import { createModel } from "../../dist";

import UserModel from "./User.model";
import UUIDMixin from "../mixins/UUID.mixin";
import StatusEnum from "../enums/Status.enum";

export default createModel((PostModel) => {
  PostModel
    .mixin(UUIDMixin)
    .enum("status", StatusEnum, { default: "PENDING" })
    .relation("author", UserModel, { references: ["id"], fields: ["authorId"] })
    .string("authorId", {});
});