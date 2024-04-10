import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { postType } from "../types/postType";

export const getBlogMetadata = async (blogId: string, postId: string) => {
  let postMetadata: object | undefined = undefined;
  const postRef = collection(firestore, blogId);
  const q = query(postRef, where("postId", "==", postId));
  const querySnapShot = await getDocs(q);
  querySnapShot.forEach((postDoc) => {
    postMetadata = postDoc.data();
    console.log(postMetadata);
  });
  return postMetadata;
};
