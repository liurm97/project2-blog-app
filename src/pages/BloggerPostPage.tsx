import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  where,
  doc,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase";
export default function BloggerPostPage() {
  const [bloggerPublishedPosts, setBloggerPublishedPosts] = useState<any>([]);
  const [bloggerName, setBloggerName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { bloggerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const executeGetBloggerPublishedPosts = async () => {
      const userRef = doc(firestore, "users", bloggerId!);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const { bloggerName } = userSnap.data();
        setBloggerName(bloggerName);
      }
      const bloggerRef = collection(firestore, bloggerId!);
      const bloggerPostsQuery = query(
        bloggerRef,
        where("status", "==", "published")
      );
      const bloggerPostsQuerySnapshot = await getDocs(bloggerPostsQuery);
      bloggerPostsQuerySnapshot.forEach((doc) => {
        setBloggerPublishedPosts((curr: any) => [...curr, doc.data()]);
        setIsLoading(false);
      });
    };
    executeGetBloggerPublishedPosts();
  }, []);
  return isLoading ? (
    ""
  ) : (
    <div className="min-h-screen flex flex-col items-center bg-gray-950">
      <div className="pt-32 pb-24 px-16 max-w-7xl">
        <p className="text-sm md:text-md font-semibold tracking-wider mb-12 text-violet-300 uppercase">
          {bloggerName}
        </p>
        <section className="flex flex-col md:grid md:grid-cols-2 md:gap-24">
          {bloggerPublishedPosts.map((post: any) => {
            return (
              <div className="mb-12 md:mb-0">
                <p className="font-medium text-gray-400">{post.author}</p>
                <p
                  className="text-2xl md:text-4xl leading-snug cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/profiles/${post.bloggerId}/posts/${post.postId}`
                    );
                  }}
                >
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
            );
          })}
        </section>
      </div>
    </div>
  );
}
