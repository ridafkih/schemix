import { createModel } from "schemix";
import AuthorMixin from "../mixins/Author.mixin";
import StatusEnum from "../enums/Status.enum";
import DateTimeMixin from "../mixins/DateTime.mixin";
import UUIDMixin from "../mixins/UUID.mixin";

export default createModel((PostModel) => {
  PostModel
    .mixin(UUIDMixin)
    .mixin(DateTimeMixin)
    .enum("status", StatusEnum)
    .string("text")
    .mixin(AuthorMixin)
    .map({ name: "post" });
});
