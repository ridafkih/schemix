import PostModel from "./Post.model";
import { extendModel } from "schemix";

export default extendModel(PostModel, (ImagePostModel) => {
  ImagePostModel
    .string("imageUrl")
    .map({ name: "imagePost" });
});
