import { createEnum } from "../../dist";

export default createEnum((StatusEnum) => {
  StatusEnum
    .addValue("PENDING")
    .addValue("LIVE")
    .addValue("DELETED")
    .addValue("REMOVED");
})