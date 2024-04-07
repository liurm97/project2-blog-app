import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export const deleteBlog = async (
  bloggerId: string,
  postId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(firestore, bloggerId, postId));
  } catch (err) {
    console.log(err);
  }
};
