import { createMixin } from "../../dist";

export default createMixin((DateTimeMixin) => {
  DateTimeMixin
    .dateTime("createdAt", { default: { now: true } })
    .dateTime("updatedAt", { updatedAt: true });
})