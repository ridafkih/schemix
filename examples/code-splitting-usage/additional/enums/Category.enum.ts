import { createEnum } from "../../../../dist"

export default createEnum((CategoryEnum) => {
  CategoryEnum
    .addValue("ROMANCE")
    .addValue("SCIFI")
    .addValue("FANTASY")
    .addValue("HISTORICAL");
})
