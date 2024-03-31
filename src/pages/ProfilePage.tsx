import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  updateMetadata,
  uploadString,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { storage, database } from "../firebase";
import { useEffect, useState } from "react";
// import AdvancedEditor from "../components/AdvancedEditor";

export default function ProfilePage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();
  const { bloggerId } = useParams();

  const getEditorContent = async () => {
    const bloggerIdRef = ref(storage, `bloggers/${bloggerId}`);
    console.log("getting url");
    const url = await getDownloadURL(bloggerIdRef);

    const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      console.log("blob", blob);
      setBlogPosts(blob);
    };
    xhr.open("GET", url);
    xhr.send();
    console.log("blog HTML uploaded");
  };

  useEffect(() => {
    getEditorContent();
  }, []);
  return (
    <div className="p-14">
      <button
        className="mt-10 border-2 rounded-md p-2"
        onClick={() => {
          signOut(auth);
          navigate("/");
        }}
      >
        Logout
      </button>

      <button></button>
      <div
        className={"bg-[#2e1139] p-4"}
        dangerouslySetInnerHTML={{ __html: blogPosts }}
      ></div>
    </div>
  );
}
