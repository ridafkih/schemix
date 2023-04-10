import { createModel } from "../../../dist"

export default createModel((UserModel) => {
  UserModel
    .int('id', {id: true, default: {autoincrement: true}})
    .string("email")
    .string("fullName")
})
