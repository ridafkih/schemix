import { createModel } from "../../../../dist";
import CategoryEnum from "../enums/Category.enum";
import DateTimeMixin from "../mixins/DateTime.mixin";

export default createModel((BookModel) => {
  BookModel
    .int('id', {id: true, default: {autoincrement: true}})
    .mixin(DateTimeMixin)
    .enum("category", CategoryEnum)
    .string("text");
})
