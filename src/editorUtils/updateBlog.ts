import { doc, setDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";
import { updateNumPublishedPost } from "../utils/updateNumPublishedPost";

export const updateBlog = async (
  blogId: string,
  postId: string,
  postStatus: string,
  newBlogContent: Object,
  isPublished: boolean
) => {
  const blogRef = collection(firestore, blogId);
  await setDoc(doc(blogRef, postId), newBlogContent);

  // if current post is Published -> if draft -> minus one
  if (postStatus == "published" && isPublished == false) {
    updateNumPublishedPost("minus");
  }
  // if current post is Draft -> if published -> add one
  else if (postStatus == "draft" && isPublished == true) {
    updateNumPublishedPost("add");
  }
};
