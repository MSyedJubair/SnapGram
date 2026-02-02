import PostCard from "@/components/Shared/PostCard";
import { Spinner } from "@/components/ui/spinner";
import { useRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { toast } from "sonner";

const Home = () => {
  const { data: posts, isPending: isGettingPosts, isError } = useRecentPosts();

  return (
    <div className="flex flex-1 overflow-y-auto">
      <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px]md:font-boldmd:leading-[140%] tracking-tightermd:text-left w-full">
            Home Feed
          </h2>

          {isGettingPosts ? (
            <div
              className="
                flex
                flex-row
                justify-center
                items-center
                gap-2
              "
            >
              <Spinner />
              <p>Loading Home Feed</p>
            </div>
          ) : isError ? (
            toast('Failed to load posts. Please try again.')
          ) : posts && posts.length > 0 ? (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts.map((post) => (
                <li key={post.$id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts yet. Check back later!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
