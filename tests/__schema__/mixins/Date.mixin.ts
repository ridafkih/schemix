import { createMixin } from "schemix/lib/index";

export default createMixin((DateMixin) => {
  DateMixin.dateTime("createdAt", { default: { now: true } }).dateTime(
    "updatedAt",
    { updatedAt: true }
  );
});
