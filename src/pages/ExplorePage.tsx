import { useEffect, useState } from "react";
import { getUserSnapshot } from "../utils/getExplorerBlogs";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, limit, query } from "firebase/firestore";
import { firestore } from "../firebase";
import { ExternalLinkIcon } from "lucide-react";

export default function ExplorePage() {
  const [explorePublishedPosts, setExplorePublishedPosts] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const POST_LIMIT = 8;
    const executeGetBlogs = async () => {
      const usersQuerySnapshot = await getUserSnapshot();
      usersQuerySnapshot.forEach((doc) => {
        const bloggerId = doc.id;
        for (let i = 0; i < POST_LIMIT; i += doc.data().published_post) {
          const posts_q = query(
            collection(firestore, bloggerId),
            where("status", "==", "published"),
            limit(2)
          );
          getDocs(posts_q).then((postQuerySnapShot) => {
            postQuerySnapShot.forEach((doc) => {
              setExplorePublishedPosts((curr: any) => [...curr, doc.data()]);
            });
          });
        }
      });
    };
    executeGetBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-950">
      <div className="pt-32 pb-24 px-16 max-w-7xl">
        <p className="text-sm md:text-md font-semibold tracking-wider mb-12 text-violet-300 uppercase">
          Trending Posts
        </p>
        <section className="flex flex-col md:grid md:grid-cols-2 md:gap-24">
          {explorePublishedPosts.map((post: any) => {
            return (
              <div className="mb-12 md:mb-0">
                <div
                  className="flex gap-0.5 mb-2 items-center justify-start"
                  onClick={() => {
                    navigate(`/profiles/${post.bloggerId}/posts`);
                  }}
                >
                  <p
                    className={
                      "cursor-pointer font-small mr-1 text-gray-400 order-1"
                    }
                    // redirect to BloggerPostPage
                  >
                    {post.bloggerName}
                  </p>

                  <span className="block order-2 cursor-pointer">
                    <ExternalLinkIcon color="violet" size={"16px"} />
                  </span>
                </div>

                <div
                  className="cursor-pointer"
                  // redirect to post page
                  onClick={() => {
                    navigate(
                      `/profiles/${post.bloggerId}/posts/${post.postId}`
                    );
                  }}
                >
                  <p className="text-2xl md:text-4xl leading-snug cursor-pointer">
                    {post.title}
                  </p>
                  <p className="text-gray-400 mt-2">
                    {post.publishedDate}
                    {" • "}
                    {post.readTime} min read
                  </p>
                  <div className="mt-4">
                    {post.tags.map((tag: any) => {
                      return (
                        <span className="text-xs bg-gray-800 text-gray-400 rounded-full px-3 py-1 mr-2">
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
