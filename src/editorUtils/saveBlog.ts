import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { type JSONContent } from "novel";
import { updateNumPublishedPost } from "../utils/updateNumPublishedPost";
export const saveBlog = async (
  bloggerId: string,
  bloggerName: string,
  postId: string,
  draftContent: string,
  jsonContent: JSONContent,
  status: string,
  title: string,
  readTime: Number,
  tags: Array<string>,
  draftDate?: string,
  publishedDate?: string
): Promise<void> => {
  try {
    await setDoc(doc(firestore, bloggerId, postId), {
      bloggerId: auth.currentUser?.uid,
      postId: postId,
      content: draftContent,
      jsonContent: JSON.stringify(jsonContent),
      status: status,
      title: title,
      readTime: readTime,
      tags: tags,
      draftDate: draftDate,
      publishedDate: publishedDate,
      bloggerName: bloggerName,
    });
    if (status == "published") {
      // add numPublishedPost value
      await updateNumPublishedPost("add");
    }
  } catch (err) {
    console.log(err);
  }
};
