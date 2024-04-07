// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
import { AddIcon, PlusSquareIcon, ArrowBackIcon } from "@chakra-ui/icons";
import DashboardPost from "../components/DashboardPost";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdvancedEditor from "../components/AdvancedEditor";
import { getBlogs } from "../editorUtils/getBlogs";

export default function ProfilePage() {
  const updateDashBoardState = (newState: string): void => {
    setDashboardState(newState);
  };

  // Pass in to DashboardPost child component
  const removeBlog = (postId: string): void => {
    const remainingBlog = blogPosts.filter(
      (currentBlog: any) => currentBlog.id != postId
    );
    if (remainingBlog.length == 0) {
      setDashboardState("noPosts");
      setBlogPosts([]);
    } else return setBlogPosts([...remainingBlog]);
  };

  const [blogPosts, setBlogPosts] = useState([]);
  // let currentDashboardState = "" //default to noPosts
  const [dashboardState, setDashboardState] = useState(""); // states: hasPosts, noPosts, edit
  // console.log(dashboardState);
  const navigate = useNavigate();
  const { bloggerId } = useParams();
  console.log(dashboardState);
  useEffect(() => {
    const execute = async () => {
      const blogs = await getBlogs(bloggerId!);
      if (blogs !== null) setBlogPosts(blogs);
    };
    if (dashboardState !== "create" && dashboardState !== "edit") execute();
    dashboardState === "edit" || dashboardState === "create"
      ? ""
      : blogPosts.length > 0
      ? setDashboardState("hasPosts")
      : setDashboardState("noPosts");
    //=================================== TODO =============================
    //*** For Bobby to think of a way to prevent many many calls....
  }, [blogPosts]);

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

  // getBlogs(bloggerId!).then((res) => {
  //   console.log("running");
  //   setBlogPosts(res);
  // });
  // getEditorContent();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col gap-4 mt-24 px-24">
        {(dashboardState === "create" || dashboardState === "edit") && (
          <div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="rounded-md flex items-center gap-2 px-4 py-3 text-md text-gray-400"
                onClick={() => {
                  blogPosts.length > 0
                    ? setDashboardState("hasPosts")
                    : setDashboardState("noPosts");
                }}
              >
                <ArrowBackIcon boxSize={4} />
                Back
              </button>{" "}
              {dashboardState == "edit" ? (
                <p className="text-md text-gray-400">Editing Post</p>
              ) : (
                <p className="text-md text-gray-400">Creating Post</p>
              )}
            </div>
            <div>
              <AdvancedEditor
                updateDashBoardState={updateDashBoardState}
                dashboardState={dashboardState}
              />
            </div>
          </div>
        )}
        {dashboardState !== "create" && dashboardState !== "edit" && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-md text-gray-400">{`Posts (${blogPosts.length})`}</p>
            <button
              className="rounded-md flex items-center gap-2 bg-[#5e167c] hover:bg-[#4e0f68] px-4 py-3 transition-all text-md"
              onClick={() => setDashboardState("create")}
            >
              <AddIcon boxSize={3} />
              Create Post
            </button>{" "}
          </div>
        )}
        {dashboardState === "hasPosts" && (
          <div className="flex flex-col">
            {blogPosts.map(({ title, status, tags, publishedDate, id }) => {
              return (
                <DashboardPost
                  key={id}
                  title={title}
                  status={status}
                  tags={tags}
                  publishDate={publishedDate}
                  bloggerId={bloggerId!}
                  postId={id}
                  removeBlog={removeBlog}
                  updateDashBoardState={updateDashBoardState}
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
