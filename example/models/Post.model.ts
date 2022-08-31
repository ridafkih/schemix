import { createModel } from "../../dist";
import StatusEnum from "../enums/Status.enum";
import DateTimeMixin from "../mixins/DateTime.mixin";
import UUIDMixin from "../mixins/UUID.mixin";
import UserModel from "./User.model";

export default createModel((PostModel) => {
  PostModel
    .mixin(UUIDMixin)
    .mixin(DateTimeMixin)
    .enum("status", StatusEnum)
    .string("text")
    .relation("author", UserModel, { fields: ["authorId"], references: ["email"] })
    .string("authorId");
})