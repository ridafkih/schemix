import { createModel } from "schemix/lib/index";
import UserStatusEnum from "../enums/UserStatus.enum";
import DateMixin from "../mixins/Date.mixin";
import UUIDMixin from "../mixins/UUID.mixin";
import PostModel from "./Post.model";

export default createModel((UserModel) => {
  UserModel.mixin(UUIDMixin)
    .mixin(DateMixin)
    .enum("status", UserStatusEnum)
    .relation("posts", PostModel, { list: true });
});
