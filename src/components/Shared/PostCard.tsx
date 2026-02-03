import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

const PostCard = ({ post }) => {
  const { user } = useUserContext();

  return (
    <div className="w-full max-w-xl bg-dark-2 border border-dark-4 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1">

      {/* Header */}
      <div className="flex justify-between items-start p-5">
        <div className="flex items-center gap-4">
          <Link to={`/profile/${post.Creator.$id}`}>
            <img
              src={
                user?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 h-12 rounded-full object-cover border border-dark-4"
            />
          </Link>

          <div className="flex flex-col">
            <p className="text-light-1 font-semibold text-base">
              {user.name}
            </p>
            <div className="flex items-center gap-2 text-light-3 text-sm">
              <span>{multiFormatDateString(post.$createdAt)}</span>
              {post.location && (
                <>
                  <span className="opacity-50">•</span>
                  <span>{post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>


        {user.id === post.Creator && (
          <Link
            to={`/update-post/${post.$id}`}
            className="p-2 rounded-lg hover:bg-dark-4 transition"
          >
            <img
              src={"./assets/icons/edit.svg"}
              alt="edit"
              width={18}
              height={18}
            />
          </Link>
        )}
      </div>

      {/* Image */}
      <Link to={`/posts/${post.$id}`}>
        <div className="w-full aspect-4/3 bg-dark-3 overflow-hidden">
          <img
            src={post.imageURL || "/assets/icons/profile-placeholder.svg"}
            alt="post"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 space-y-4">
        <p className="text-light-2 text-sm leading-relaxed">
          {post.Caption}
        </p>

        {/* Tags */}
        {post.Tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.Tags.map((tag: string, index: number) => (
              <span
                key={`${tag}${index}`}
                className="px-3 py-1 text-xs rounded-full bg-dark-4 text-light-3 hover:bg-primary-500/20 hover:text-primary-500 transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
