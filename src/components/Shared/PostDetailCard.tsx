import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import type { IPost } from "@/types";

const PostDetailsCard = ({ post }: { post: IPost }) => {
  const { user } = useUserContext();

  if (!post.Creator) return null;

  const isOwner = user.id === post?.Creator || '';

  return (
    <div className="w-full max-w-4xl mx-auto bg-dark-2 rounded-3xl border border-dark-4 overflow-hidden shadow-xl">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={post.imageURL?.toString() || "/assets/icons/profile-placeholder.svg"}
          alt="post"
          className="w-full max-h-[600px] object-cover"
        />

        {/* Optional subtle fade */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="p-6 lg:p-10 flex flex-col gap-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Link to={`/profile/${post.Creator || ''}`}>
              <img
                src={user?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="creator"
                className="w-14 h-14 rounded-full object-cover border border-primary-500"
              />
            </Link>

            <div className="flex flex-col">
              <p className="text-lg font-semibold text-light-1">
                {user.name}
              </p>
              <div className="flex items-center gap-2 text-light-3 text-sm">
                <span>{multiFormatDateString(post.$createdAt)}</span>

                {post.location && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-light-3 opacity-50" />
                    <span className="line-clamp-1">{post.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* EDIT BUTTON */}
          {isOwner && (
            <Link
              to={`/update-post/${post.$id}`}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <img
                src="/assets/icons/edit.svg"
                alt="edit"
                width={20}
                height={20}
              />
            </Link>
          )}
        </div>

        {/* CAPTION */}
        <div className="flex flex-col gap-4">
          <p className="text-light-1 text-base leading-relaxed">
            {post.Caption}
          </p>

          {/* TAGS */}
          {post.Tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.Tags.map((tag: string) => (
                <li
                  key={tag}
                  className="text-sm bg-primary-500/10 text-primary-400 px-3 py-1 rounded-full"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-dark-4" />

        {/* POST STATS */}
        <PostStats post={post} userId={user.id} />
      </div>
    </div>
  );
};

export default PostDetailsCard;
