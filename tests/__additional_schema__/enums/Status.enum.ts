import { createEnum } from "schemix/lib/index";

export default createEnum((StatusEnum) => {
  StatusEnum.addValue("PENDING")
    .addValue("LIVE")
    .addValue("DELETED")
    .addValue("REMOVED");
});
