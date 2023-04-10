import { createModel } from "../../../../dist";

export default createModel((ReaderModel) => {
  ReaderModel
    .int('id', {id: true, default: {autoincrement: true}})
    .string("firstName")
    .string("LastName")
    .int('numBooks_read');
})
