import { createModel } from "schemix/lib/index";
import DateMixin from "../mixins/Date.mixin";
import UUIDMixin from "../mixins/UUID.mixin";

export default createModel((PostModel) => {
  PostModel.mixin(UUIDMixin)
    .mixin(DateMixin)
    .string("content")
    .boolean("deleted");
});
