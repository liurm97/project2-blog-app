import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { updateNumPublishedPost } from "../utils/updateNumPublishedPost";

export const deleteBlog = async (
  bloggerId: string,
  postId: string,
  status: string
): Promise<void> => {
  try {
    await deleteDoc(doc(firestore, bloggerId, postId));
    // get numPublishedPost of the blogger
    if (status == "published") {
      // minus numPublishedPost value
      updateNumPublishedPost("minus");
    }
  } catch (err) {
    throw new Error("Something wrong happened when deleting post");
  }
};
