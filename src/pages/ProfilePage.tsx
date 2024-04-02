// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";
import { AddIcon, PlusSquareIcon, ArrowBackIcon } from "@chakra-ui/icons";
import DashboardPost from "../components/DashboardPost";
import { useState } from "react";

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
    </div>
  );
}
