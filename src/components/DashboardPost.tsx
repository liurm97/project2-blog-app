import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { deleteBlog } from "../editorUtils/deleteBlog";
const DashboardPost = ({
  title,
  status,
  tags,
  publishDate,
  bloggerId,
  postId,
  removeBlog,
  updateDashBoardState,
}: {
  title: string;
  status: string;
  tags: Array<string>;
  publishDate: string;
  bloggerId: string;
  postId: string;
  removeBlog(postId: string): void;
  updateDashBoardState(newState: string): void;
}) => {
  const statusColor =
    status === "Published"
      ? "bg-green-600 text-green-200"
      : "bg-violet-700 text-violet-200";

  return (
    <div className="rounded-sm border-b flex items-center border-b-gray-700 py-4">
      <div className="flex flex-col pr-4 py-6 w-[26rem]">
        <p className="font-medium text-xl">{title}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => {
            return (
              <span
                className="text-xs bg-gray-800 text-gray-400 rounded-full px-3 py-1"
                key={postId}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center text-xs w-20 mx-6">
        <p className={`${statusColor} px-3 py-1 rounded-2xl font-medium`}>
          {status}
        </p>
      </div>
      <p className="mx-6">{publishDate}</p>
      {/* Edit */}
      <div className="flex gap-4 ml-auto">
        <button
          className="bg-gray-800 px-3 py-2 pt-1 rounded-md"
          onClick={() => {
            updateDashBoardState("edit");
            console.log("edit");
          }}
        >
          <EditIcon boxSize={4} color="gray.400" />
        </button>
        {/* Delete */}
        <button
          className="bg-[#511a1a] px-3 py-2 pt-1 rounded-md"
          onClick={() => {
            console.log("delete button");
            console.log("delete post", postId);
            removeBlog(postId);
            deleteBlog(bloggerId, postId);
          }}
        >
          <DeleteIcon boxSize={4} color="red.500" />
        </button>
      </div>
    </div>
  );
};

export default DashboardPost;
