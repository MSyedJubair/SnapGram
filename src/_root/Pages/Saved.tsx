import PostCard from "@/components/Shared/PostCard";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetSavedPosts,
  useGetSaves,
} from "@/lib/react-query/queriesAndMutations";
import { toast } from "sonner";

const Saved = () => {
  const { data: saves } = useGetSaves();
  const postIds = saves?.map((save) => save.post) || [];
  const { data: posts, isLoading, isError } = useGetSavedPosts(postIds);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-5 md:px-8 lg:px-14">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center md:text-left mb-10">
          Your Saved Posts
        </h2>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center gap-4 py-10">
            <Spinner />
            <p className="text-gray-400 text-lg">Loading your saved posts...</p>
          </div>
        )}

        {/* Error State */}
        {isError && toast("Failed to load posts. Please try again.")}

        {/* Posts */}
        {!isLoading && posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        ) : (
          !isLoading && (
            <p className="text-gray-400 text-center text-lg py-10">
              No saved posts yet. Start exploring and save your favorites!
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Saved;
