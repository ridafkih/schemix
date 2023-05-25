import { createModel } from "schemix/lib/index";

export default createModel((BookModel) => {
  BookModel.int("id", { id: true, default: { autoincrement: true } }).string(
    "text"
  );
});
