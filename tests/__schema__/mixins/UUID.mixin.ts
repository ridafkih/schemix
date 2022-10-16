import { createMixin } from "schemix/lib/index";

export default createMixin((UUIDMixin) => {
  UUIDMixin.string("id", { default: { uuid: true }, id: true });
});
