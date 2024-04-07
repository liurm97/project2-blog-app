import { createImageUpload } from "novel/plugins";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const onUpload = async (file: File) => {
  // 1. retrieve blogger id from URL
  const fullURLSplit = window.location.pathname.split("/");
  const bloggerId = fullURLSplit.slice(
    fullURLSplit.length - 1,
    fullURLSplit.length
  )[0];
  console.log(bloggerId);

  // Saving to Firestore temporary Image Storage
  // 2. create temporary imageRef
  const tempImageRef = ref(storage, `tempImages/${bloggerId}/${file.name}`);

  // 3. upload image to temporary FireStore Storage
  await uploadBytes(tempImageRef, file);

  console.log("image uploaded");

  // 4. get download URL of the file
  const url = await getDownloadURL(
    ref(storage, `tempImages/${bloggerId}/${file.name}`)
  );

  return url;
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      return false;
    }
    return true;
  },
});
