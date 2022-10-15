import { createMixin } from "../../../dist";

export default createMixin((UUIDMixin) => {
  UUIDMixin
    .string("id", { id: true, default: { uuid: true }, raw: "@database.Uuid" });
});