import PostCard from "@/components/Shared/PostCard";
import { Spinner } from "@/components/ui/spinner";
import { useInfinitePosts } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex gap-4 justify-center items-center h-screen w-full">
        <Spinner />
        <p>Loading Your Feed</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-400 mt-4">
        Oops! Something went wrong while fetching users.
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-y-auto bg-dark-1">
      <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Header */}
        <div className="sticky top-0 bg-dark-1 z-10 pb-6 border-b border-dark-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Explore
          </h1>
          <p className="text-light-3 text-sm mt-1">
            See what’s happening right now
          </p>
        </div>

        {/* Posts List */}
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="bg-dark-2 rounded-2xl p-5 border border-dark-4 transition hover:border-dark-3"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Infinite Scroll Trigger */}
        {hasNextPage && (
          <div ref={ref} className="flex justify-center py-10">
            <Spinner />
          </div>
        )}

        {/* End State */}
        {!hasNextPage && posts.length > 0 && (
          <p className="text-light-4 text-center py-10">
            You’ve reached the end, Take a break - Go touch grass
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
