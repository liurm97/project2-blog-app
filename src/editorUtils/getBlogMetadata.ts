import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export const getBlogMetadata = async (blogId: string, postId: string) => {
  let postMetadata: object | undefined = undefined;
  const postRef = collection(firestore, blogId);
  const q = query(postRef, where("postId", "==", postId));
  const querySnapShot = await getDocs(q);
  querySnapShot.forEach((postDoc) => {
    postMetadata = postDoc.data();
  });
  return postMetadata;
};
