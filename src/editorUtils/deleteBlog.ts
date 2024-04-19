import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { updateNumPublishedPost } from "../utils/updateNumPublishedPost";

export const deleteBlog = async (
  bloggerId: string,
  postId: string,
  status: string
): Promise<void> => {
  console.log(status);

  try {
    await deleteDoc(doc(firestore, bloggerId, postId));
    // get numPublishedPost of the blogger
    if (status == "published") {
      // minus numPublishedPost value
      updateNumPublishedPost("minus");
    }
  } catch (err) {
    console.log(err);
  }
};
