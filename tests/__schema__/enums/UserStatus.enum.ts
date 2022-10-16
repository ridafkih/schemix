import { createEnum } from "schemix/lib/index";

export default createEnum((UserStatusEnum) => {
  UserStatusEnum.addValue("ACTIVE").addValue("INACTIVE").addValue("BANNED");
});
