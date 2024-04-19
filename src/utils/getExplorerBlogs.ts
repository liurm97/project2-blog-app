// Take 2 of the most recently published blogs from each blogger

import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  where,
  limit,
  doc,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase";

// Total number of published_posts should be limited to 8:

// If published_post per blogger > 2: Take only 2 posts

// If published_post per blogger <=2: Take all posts

export const getUserSnapshot = async () => {
  const usersRef = collection(firestore, "users");
  const users_q = query(
    usersRef,
    where("numPublishedPost", ">", 0),
    orderBy("numPublishedPost")
  );
  const usersQuerySnapshot = await getDocs(users_q);
  return usersQuerySnapshot;
};
