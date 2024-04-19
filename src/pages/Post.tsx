import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useParams } from "react-router-dom";

export default function Post() {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { bloggerId, postId } = useParams();

  useEffect(() => {
    console.log("in useEffect");
    const getPostData = async () => {
      const postRef = doc(firestore, bloggerId!, postId!);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        setPost(postSnapshot.data());
        setIsLoading(false);
      }
    };
    getPostData();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="min-h-screen bg-gray-950">
          <section className="flex flex-col items-center pt-48 pb-24 px-16">
            <div className="max-w-7xl flex flex-col items-center mb-8 px-8">
              {/* Replace with post title here */}
              <h1 className="max-w-[30ch] text-center text-4xl md:text-6xl font-medium">
                {post?.title}
              </h1>
              {/* Replace with displayName and publishDate here */}
              <p className="text-gray-400 text-center mt-8">
                Posted by{" "}
                <span className="text-violet-400 font-medium">
                  {post.bloggerName}
                </span>{" "}
                {post.publishDate}
              </p>
              {/* Replace with reading time here */}
              <p className="text-gray-400 text-center mt-2 italic">
                {post.readTime} min read{" "}
              </p>
            </div>
            <div className="h-[2px] bg-gray-800 w-1/12 mb-8"></div>
            {/* Replace with post content here */}
            <div
              className="min-w-2xl text-gray-300 max-w-3xl text-sm md:text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </section>
        </div>
      )}
    </>
  );
}
