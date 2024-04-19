import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { updateNumPublishedPost } from "../utils/updateNumPublishedPost";

type newBlogContent = {
  bloggerName: string;
  draftContent?: string;
  status?: string;
  title?: string;
  readTime?: Number;
  tags?: Array<string>;
  draftDate?: string;
  publishedDate?: string;
};
export const updateBlog = async (
  blogId: string,
  postId: string,
  newBlogContent: Object,
  isPublished: boolean
) => {
  const blogRef = collection(firestore, blogId);
  // const q = query(blogRef, where("PostId", "==", postId))
  console.log(newBlogContent);
  await setDoc(doc(blogRef, postId), newBlogContent);

  if (isPublished == true) {
    updateNumPublishedPost("add");
  } else {
    updateNumPublishedPost("minus");
  }
};
