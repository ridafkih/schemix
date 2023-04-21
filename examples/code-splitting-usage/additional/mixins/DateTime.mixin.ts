import { createMixin } from "../../../../dist";

export default createMixin((DateTimeMixin) => {
  DateTimeMixin
    .dateTime("otherTimestampAt", { default: { now: true } })
    .dateTime("someOtherOtherTimestampAt", { updatedAt: true });
})
