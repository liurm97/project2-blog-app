// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
import { AddIcon, PlusSquareIcon, ArrowBackIcon } from "@chakra-ui/icons";
import DashboardPost from "../components/DashboardPost";
import { useState, useEffect } from "react";
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

const dummyData = [
  {
    title: "Title of Post 1 extended to show how it looks like when it's long",
    status: "Published",
    tags: ["Tech", "Travel", "Education"],
    publishDate: "2022-01-01",
  },
  {
    title: "Title of Post 2 extended to show how it looks like when it's long",
    status: "Draft",
    tags: ["Travel"],
    publishDate: "2022-01-01",
  },
  {
    title: "Title of Post 3",
    status: "Published",
    tags: ["Life", "Work"],
    publishDate: "2022-01-01",
  },
];

export default function ProfilePage() {
  const currentDashboardState = dummyData.length > 0 ? "hasPosts" : "noPosts";
  const [dashboardState, setDashboardState] = useState(currentDashboardState); // states: hasPosts, noPosts, edit
// import AdvancedEditor from "../components/AdvancedEditor";

  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate();
  const { bloggerId } = useParams();

  // const getEditorContent = async () => {
  //   const bloggerIdRef = ref(storage, `bloggers/${bloggerId}`);
  //   console.log("getting url");
  //   const url = await getDownloadURL(bloggerIdRef);

  //   const xhr = new XMLHttpRequest();
  //   // xhr.responseType = 'blob';
  //   xhr.onload = (event) => {
  //     const blob = xhr.response;
  //     console.log("blob", blob);
  //     setBlogPosts(blob);
  //   };
  //   xhr.open("GET", url);
  //   xhr.send();
  //   console.log("blog HTML uploaded");
  // };

  useEffect(() => {
    // getEditorContent();
  }, []);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col gap-4 mt-24 px-24">
        {dashboardState === "edit" && (
          <div className="flex justify-between items-center mt-4">
            <button
              className="rounded-md flex items-center gap-2 px-4 py-3 text-md text-gray-400"
              onClick={() => setDashboardState(currentDashboardState)}
            >
              <ArrowBackIcon boxSize={4} />
              Back
            </button>{" "}
            <p className="text-md text-gray-400">Editing Post</p>
          </div>
        )}
        {dashboardState !== "edit" && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-md text-gray-400">{`Posts (${dummyData.length})`}</p>
            <button
              className="rounded-md flex items-center gap-2 bg-[#5e167c] hover:bg-[#4e0f68] px-4 py-3 transition-all text-md"
              onClick={() => setDashboardState("edit")}
            >
              <AddIcon boxSize={3} />
              Create Post
            </button>{" "}
          </div>
        )}
        {dashboardState === "hasPosts" && (
          <div className="flex flex-col">
            {dummyData.map(({ title, status, tags, publishDate }) => {
              return (
                <DashboardPost
                  title={title}
                  status={status}
                  tags={tags}
                  publishDate={publishDate}
                />
              );
            })}
          </div>
        )}
        {dashboardState === "noPosts" && (
          <div className="flex flex-col justify-center flex-grow items-center border-2 border-gray-800 rounded-lg mt-6 mb-10 text-gray-600">
            <PlusSquareIcon boxSize={8} className="mb-4" color="gray.700" />
            <p>Write your first post!</p>
          </div>
        )}
      </div>
    {/* <div className="p-14">
      <button
        className="mt-10 border-2 rounded-md p-2"
        onClick={() => {
          signOut(auth);
          navigate("/");
        }}
      >
        Logout
      </button> */}

      {/* <button></button> */}
      {/* <div
        className={"bg-[#2e1139] p-4"}
        dangerouslySetInnerHTML={{ __html: blogPosts }}
      ></div> */}
    </div>
  );
}
