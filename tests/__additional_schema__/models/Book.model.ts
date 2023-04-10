import { createModel } from "schemix/lib/index";
import StatusEnum from "../enums/Status.enum";
import DateTimeMixin from "../mixins/DateTime.mixin";

export default createModel((BookModel) => {
  BookModel.int("id", { id: true, default: { autoincrement: true } })
    .mixin(DateTimeMixin)
    .enum("status", StatusEnum)
    .string("text");
});
