import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore, auth } from "../firebase";

export const updateNumPublishedPost = async (action: string) => {
  const userRef = doc(firestore, "users", auth.currentUser?.uid!);
  const currentUserSnapshot = await getDoc(userRef);
  if (currentUserSnapshot.exists()) {
    const currentUserNumPublishedPost =
      currentUserSnapshot.data()["numPublishedPost"];
    if (action == "add") {
      await updateDoc(userRef, {
        numPublishedPost: currentUserNumPublishedPost + 1,
      });
    } else if (action == "minus") {
      await updateDoc(userRef, {
        numPublishedPost: currentUserNumPublishedPost - 1,
      });
    }
  }
};
