import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import type { IPost } from "@/types";

const ExplorePostCard = ({ post }: { post: IPost }) => {
  const { user } = useUserContext();

  if (!post.Creator) return null;

  return (
    <div
      className="
      relative w-full max-w-full rounded-3xl overflow-hidden 
      group cursor-pointer transition-all duration-500
      
      before:absolute before:inset-0 before:rounded-3xl
      before:border before:border-primary-500/40
      before:opacity-0 before:transition-all before:duration-500
      
      hover:before:opacity-100
      hover:shadow-[0_0_30px_rgba(135,126,255,0.35)]
      "
    >
      {/* IMAGE */}
      <Link to={`/posts/${post.$id}`}>
        <img
          src={
            post.imageURL?.toString() ||
            "/assets/icons/profile-placeholder.svg"
          }
          alt="post"
          className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* BLACK FADE */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 pointer-events-none" />

      {/* CONTENT OVERLAY */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
        {/* CREATOR */}
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.Creator}`}>
            <img
              src={
                user?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-10 h-10 rounded-full object-cover border border-white/30"
            />
          </Link>

          <div className="flex flex-col text-white">
            <p className="text-sm font-semibold leading-tight">
              {user.name}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span>
                {multiFormatDateString(post.$createdAt)}
              </span>
              {post.location && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-400 opacity-70" />
                  <span className="truncate max-w-[120px]">
                    {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* CAPTION */}
        <div className="text-white">
          <p className="text-sm font-medium line-clamp-2">
            {post.Caption}
          </p>

          {post.Tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-2">
              {post.Tags.slice(0, 3).map((tag: string) => (
                <li
                  key={tag}
                  className="text-xs bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* STATS */}
        <div className="pt-2">
          <PostStats post={post} userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default ExplorePostCard;
