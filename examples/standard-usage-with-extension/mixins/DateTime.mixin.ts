import { createMixin } from "schemix";

export default createMixin((DateTimeMixin) => {
  DateTimeMixin
    .dateTime("createdAt", { default: { now: true } })
    .dateTime("updatedAt", { updatedAt: true });
});
