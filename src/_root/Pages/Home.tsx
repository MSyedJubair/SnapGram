import PostCard from "@/components/Shared/PostCard";
import { Spinner } from "@/components/ui/spinner";
import { useRecentPosts } from "@/lib/react-query/queriesAndMutations";
import type { IPost } from "@/types";

const Home = () => {
  const { data: posts, isPending: isGettingPosts } = useRecentPosts();

  return (
    <div className="flex flex-1">
      {/* Container: Replaces flex-col items-center gap-10 etc. */}
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14 overflow-y-auto">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          {/* Typography: Replaces h3-bold md:h2-bold */}
          <h2 className="text-2xl font-bold md:text-3xl text-left w-full text-white">
            Home Feed
          </h2>

          {isGettingPosts && !posts ? (
            <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
              <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
                <Spinner/>
                <p className="text-gray-400">Loading...</p>
              </div>
            </div>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.map((post) => (
                <li key={post.$id} className="flex justify-center w-full">
                  {/* Typed the post directly in the map or as a cast */}
                  <PostCard post={post as unknown as IPost} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;