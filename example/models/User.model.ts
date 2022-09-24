import { createModel } from "../../dist";
import DateTimeMixin from "../mixins/DateTime.mixin";
import AuthModel from "./auth/Auth.model";
import PostModel from "./Post.model";

export default createModel((UserModel) => {
  UserModel
    .mixin(DateTimeMixin)
    .relation("posts", PostModel, { list: true })
    .relation("auth", AuthModel, { optional: true })
    .relation("friends", UserModel, { list: true, name: "friends" })
    .relation("friendRelations", UserModel, { list: true, name: "friends" })
    .string("email")
    .string("fullName")
    .map("user")
    .id({ fields: ["email"] });
})