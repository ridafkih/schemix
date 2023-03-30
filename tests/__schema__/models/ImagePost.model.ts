import { extendModel } from "schemix/lib/index";
import PostModel from "./Post.model";

export default extendModel(PostModel, (ImagePostModel) => {
  ImagePostModel.string("imageUrl");
});
