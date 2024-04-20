import { AddIcon, PlusSquareIcon, ArrowBackIcon } from "@chakra-ui/icons";
import DashboardPost from "../components/DashboardPost";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdvancedEditor from "../components/AdvancedEditor";
import { getBlogs } from "../editorUtils/getBlogs";

export default function ProfilePage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [dashboardState, setDashboardState] = useState<string>(""); // states: "", edit, create
  const [editPostId, setEditPostId] = useState<string>(""); // post id of edit-article
  const { bloggerId } = useParams();

  const updateEditPostId = (newState: string): void => {
    setEditPostId(newState);
  };

  const updateDashBoardState = (newState: string): void => {
    setDashboardState(newState);
  };

  // Pass in to DashboardPost child component
  const removeBlog = (postId: string): void => {
    const remainingBlog = blogPosts.filter(
      (currentBlog: any) => currentBlog.id != postId
    );
    if (remainingBlog.length == 0) {
      setBlogPosts([]);
    } else return setBlogPosts([...remainingBlog]);
  };

  useEffect(() => {
    const execute = async () => {
      const blogs = await getBlogs(bloggerId!);
      if (blogs.length > 0) {
        if (dashboardState === "") {
          setBlogPosts(blogs);
        }
      } else {
        if (dashboardState === "") {
          setBlogPosts(blogs);
        }
      }
    };
    execute();
  }, [dashboardState]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col gap-4 mt-24 px-16">
        {/* Create */}
        {dashboardState === "create" && (
          <div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="rounded-md flex items-center gap-2 px-4 py-3 text-md text-gray-400"
                onClick={() => {
                  setDashboardState("");
                }}
              >
                <ArrowBackIcon boxSize={4} />
                Back
              </button>{" "}
              <p className="text-md text-gray-400">Creating Post</p>
            </div>
            <div>
              {/* Render Editor Component */}
              <AdvancedEditor
                updateDashBoardState={updateDashBoardState}
                dashboardState={dashboardState}
              />
            </div>
          </div>
        )}

        {/* Edit */}
        {dashboardState === "edit" && (
          <div>
            <div className="flex justify-between items-center mt-4">
              <button
                className="rounded-md flex items-center gap-2 px-4 py-3 text-md text-gray-400"
                onClick={() => {
                  setDashboardState("");
                }}
              >
                <ArrowBackIcon boxSize={4} />
                Back
              </button>{" "}
              <p className="text-md text-gray-400">Editing Post</p>
            </div>
            <div>
              {/* Render Editor Component */}
              <AdvancedEditor
                updateDashBoardState={updateDashBoardState}
                dashboardState={dashboardState}
                editBloggerId={bloggerId!}
                editPostId={editPostId}
              />
            </div>
          </div>
        )}
        {/* Create Post Btn */}
        {dashboardState === "" && (
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

        {/* Posts > 0 */}
        {blogPosts.length > 0 && dashboardState == "" && (
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
                  updateEditPostId={updateEditPostId}
                  updateDashBoardState={updateDashBoardState}
                />
              );
            })}
          </div>
        )}
        {/* Posts == 0 */}
        {blogPosts.length === 0 && dashboardState == "" && (
          <div className="flex flex-col justify-center flex-grow items-center border-2 border-gray-800 rounded-lg mt-6 mb-10 text-gray-600">
            <PlusSquareIcon boxSize={8} className="mb-4" color="gray.700" />
            <p>Write your first post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
