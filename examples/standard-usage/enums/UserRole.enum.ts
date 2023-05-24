import { createEnum } from "../../../dist";

export default createEnum((UserRoleEnum) => {
  UserRoleEnum
    .map("userRole")
    .addValue("MEMBER")
    .addValue("ADMIN");
})
