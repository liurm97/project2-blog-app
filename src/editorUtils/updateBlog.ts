import { doc, setDoc, collection, query, where } from "firebase/firestore";
import { firestore } from "../firebase";

type newBlogContent = {
  draftContent?: string;
  status?: string;
  title?: string;
  readTime?: string;
  tags?: Array<string>;
  draftDate?: string;
  publishedDate?: string;
};
export const updateBlog = async (
  blogId: string,
  postId: string,
  newBlogContent: Object
) => {
  const blogRef = collection(firestore, blogId);
  // const q = query(blogRef, where("PostId", "==", postId))
  console.log(newBlogContent);
  await setDoc(doc(blogRef, postId), newBlogContent);
};
