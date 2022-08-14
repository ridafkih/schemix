import { createEnum } from "../../dist";

export default createEnum("Status", (StatusEnum) => {
  StatusEnum
    .addValue("PENDING")
    .addValue("POSTED")
    .addValue("REMOVED")
});