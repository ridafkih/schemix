import { createMixin } from "schemix/lib/index";

export default createMixin((DateTimeMixin) => {
  DateTimeMixin.dateTime("initializedAt", { default: { now: true } }).dateTime(
    "editedAt",
    { updatedAt: true }
  );
});
