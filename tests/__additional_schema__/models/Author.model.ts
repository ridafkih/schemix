import { createModel } from "schemix/lib/index";

export default createModel((AuthorModel) => {
  AuthorModel.int("id", { id: true, default: { autoincrement: true } })
    .string("email")
    .string("firstName")
    .string("LastName");
});
