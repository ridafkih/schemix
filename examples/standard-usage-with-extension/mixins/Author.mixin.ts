import { createMixin } from "schemix";
import UserModel from "../models/User.model";

export default createMixin((AuthorMixin) => {
  AuthorMixin
    .relation("author", UserModel, { fields: ["authorId"], references: ["email"]})
    .string("authorId");
});
