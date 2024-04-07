import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export const getBlogs = async (bloggerId: string) => {
  const blogs: any = [];
  const querySnapshot = await getDocs(collection(firestore, bloggerId));
  querySnapshot.forEach((doc) => {
    blogs.push(Object.assign(doc.data(), { id: doc.id }));
  });
  return blogs;
};
