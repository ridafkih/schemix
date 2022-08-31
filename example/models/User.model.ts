import { createModel } from "../../dist";
import DateTimeMixin from "../mixins/DateTime.mixin";
import PostModel from "./Post.model";

export default createModel((UserModel) => {
  UserModel
    .mixin(DateTimeMixin)
    .relation("posts", PostModel, { list: true })
    .relation("friends", UserModel, { list: true, name: "friends" })
    .relation("friendRelations", UserModel, { list: true, name: "friends" })
    .string("email")
    .string("fullName")
    .id({ fields: ["email"] });
})