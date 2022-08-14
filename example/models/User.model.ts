import { createModel } from "../../dist";

import PostModel from "./Post.model";
import UUIDMixin from "../mixins/UUID.mixin";

export default createModel((UserModel) => {
  UserModel
    .mixin(UUIDMixin)
    .relation("friends", UserModel, { list: true, name: "friends" })
    .relation("friendsRelation", UserModel, { list: true, name: "friends" })
    .relation("posts", PostModel, { list: true });
});
