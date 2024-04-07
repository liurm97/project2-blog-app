import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { type JSONContent } from "novel";
export const saveBlog = async (
  bloggerId: string,
  postId: string,
  draftContent: string,
  jsonContent: JSONContent,
  status: string,
  title: string,
  readTime: string,
  tags: Array<string>,
  draftDate?: string,
  publishedDate?: string
): Promise<void> => {
  try {
    await setDoc(doc(firestore, bloggerId, postId), {
      content: draftContent,
      jsonContent: JSON.stringify(jsonContent),
      status: status,
      title: title,
      readTime: readTime,
      tags: tags,
      draftDate: draftDate,
      publishedDate: publishedDate,
    });
  } catch (err) {
    console.log(err);
  }
};
