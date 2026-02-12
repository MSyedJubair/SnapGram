import PostCard from "@/components/Shared/PostCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUserContext } from "@/context/AuthContext";
import {
  useFollowUser,
  useGetUserById,
  useGetUserPosts,
} from "@/lib/react-query/queriesAndMutations";
import type { IPost } from "@/types";
import { useParams, Link } from "react-router-dom";

const Profile = () => {
  const { user } = useUserContext();
  const { id } = useParams();

  const isCurrentUser = id === user.id;
  
  const { data: mainUser, isLoading } = useGetUserById(id!);

  const isFollowingUser = mainUser?.Followers.includes(user.id) || false

  const { data: userPosts, isLoading: postsLoading } = useGetUserPosts(
    mainUser?.$id || "",
  );
  const { mutate: followUser, isPending: isFollowingPending } = useFollowUser()

  if (!mainUser) return null;

  const handleFollowUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    followUser(mainUser.$id)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-light-2">
        <Spinner className="size-8" />
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto px-6 py-10 overflow-y-auto">
      {/* HEADER / HERO SECTION */}
      <div className="relative bg-dark-2 border border-dark-4 rounded-3xl overflow-hidden shadow-xl">
        {/* Banner */}
        <div className="h-40 bg-gradient-to-r from-primary-500/30 via-purple-600/30 to-pink-500/30" />

        {/* Profile Content */}
        <div className="px-8 pb-8">
          {/* Avatar + Edit */}
          <div className="flex justify-between items-end -mt-16">
            <img
              src={mainUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-dark-2 object-cover shadow-lg"
            />

            {isCurrentUser ? (
              <Link
                to={`/update-profile/${mainUser.$id}`}
                className="bg-primary-500 hover:bg-white/10 transition px-5 py-2 rounded-xl text-white text-sm font-medium"
              >
                Edit Profile
              </Link>
            ) : (
              <Button className="bg-primary-500 hover:bg-white/10 transition px-5 py-2 rounded-xl text-white text-sm font-medium" onClick={handleFollowUser} disabled={isFollowingUser}>
                {isFollowingUser ? "Following" : isFollowingPending ? (<Spinner className="size-4" />) : "Follow"}
              </Button>
            )}
          </div>

          {/* User Info */}
          <div className="mt-6 flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-light-1">{mainUser.name}</h1>
            <p className="text-light-3">@{mainUser.username}</p>

            {mainUser.bio && (
              <p className="text-light-2 mt-3 max-w-2xl">{mainUser.bio}</p>
            )}
          </div>

          {/* Stats Section */}
          <div className="flex gap-10 mt-6 text-light-2">
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-light-1">
                {userPosts?.length}
              </span>
              <span className="text-sm text-light-3">Posts</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-semibold text-light-1">{mainUser.Followers.length || 0}</span>
              <span className="text-sm text-light-3">Followers</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-semibold text-light-1">{mainUser.Following.length || 0}</span>
              <span className="text-sm text-light-3">Following</span> 
            </div>
          </div>
        </div>
      </div>

      {/* POSTS GRID SECTION (placeholder for now) */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-light-1 mb-6">Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {postsLoading ? (
            <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
              <Spinner className="size-8" />
              Loading posts...
            </div>
          ) : userPosts?.length === 0 ? (
            <p className="text-light-2 text-center">No posts yet.</p>
          ) : (
            userPosts?.map((post) => (
              <PostCard key={post.$id} post={post as unknown as IPost} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
