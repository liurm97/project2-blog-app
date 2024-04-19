import { useEffect, useState } from "react";
import { getUserSnapshot } from "../utils/getExplorerBlogs";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  where,
  limit,
  doc,
  query,
} from "firebase/firestore";
import { firestore } from "../firebase";

export default function ExplorePage() {
  // const dummyData = [
  //   {
  //     title: "I Asked a Generative AI Music Platform to Write a Podcast Theme",
  //     author: "John Doe",
  //     readingTime: "2",
  //     tags: ["Travel", "Others"],
  //     publishedDate: "2022-01-01",
  //     id: "1",
  //   },
  //   {
  //     title: "My Journey to being diagnosed with cancer at the age of 32",
  //     author: "John Doe",
  //     readingTime: "3",
  //     tags: ["Technology", "Foodie"],
  //     publishedDate: "2022-01-02",
  //     id: "2",
  //   },
  //   {
  //     title: "The Gratitude Typewriter",
  //     author: "John Doe",
  //     readingTime: "4",
  //     tags: ["Music"],
  //     publishedDate: "2022-01-03",
  //     id: "3",
  //   },
  //   {
  //     title: "The Brain Science Behind Aging and Forgetting",
  //     author: "John Doe",
  //     readingTime: "3",
  //     tags: ["Technology"],
  //     publishedDate: "2022-01-03",
  //     id: "3",
  //   },
  // ];

  const [publishedPosts, setPublishedPosts] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(bloggerId);
    const POST_LIMIT = 8;
    const executeGetBlogs = async () => {
      const usersQuerySnapshot = await getUserSnapshot();
      usersQuerySnapshot.forEach((doc) => {
        const bloggerId = doc.id;
        for (let i = 0; i < POST_LIMIT; i += doc.data().published_post) {
          const posts_q = query(
            collection(firestore, bloggerId),
            orderBy("publishedDate"),
            limit(2)
          );
          getDocs(posts_q).then((postQuerySnapShot) => {
            postQuerySnapShot.forEach((doc) => {
              setPublishedPosts((curr: any) => [...curr, doc.data()]);
            });
          });
        }
      });
    };
    executeGetBlogs();
    // getBlogs;
  }, []);

  console.log(publishedPosts);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-950">
      <div className="pt-32 pb-24 px-16 max-w-7xl">
        <p className="text-sm md:text-md font-semibold tracking-wider mb-12 text-violet-300 uppercase">
          Trending Posts
        </p>
        <section className="flex flex-col md:grid md:grid-cols-2 md:gap-24">
          {publishedPosts.map((post: any) => {
            return (
              <div
                className="mb-12 md:mb-0"
                // onClick={() => console.log("clicked")}
              >
                {/* Replace with blogger name, post title, publishedDate, readTime here */}
                <p className="font-medium text-gray-400">{post.author}</p>
                <p
                  className="text-2xl md:text-4xl leading-snug cursor-pointer"
                  onClick={() => {
                    console.log("click to open post");
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
                  {/* Replace with category tags here */}
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
    //     <div className="flex flex-col">
    //       {/* {blogPosts.map(({ title, status, tags, publishedDate, id }) => {
    //       return (
    //         <DashboardPost
    //           key={id}
    //           title={title}
    //           status={status}
    //           tags={tags}
    //           publishDate={publishedDate}
    //           bloggerId={bloggerId!}
    //           postId={id}
    //           removeBlog={removeBlog}
    //           updateEditPostId={updateEditPostId}
    //           updateDashBoardState={updateDashBoardState}
    //         />
    //       );
    //     })} */}
    //     </div>
    //   </section>
  );
}
