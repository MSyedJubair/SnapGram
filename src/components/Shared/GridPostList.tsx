import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import type { IPost } from "@/types";

type GridPostListProps = {
    posts: IPost[];
    showStats?: boolean;
};

const GridPostList = ({
    posts,
    showStats = true,
}: GridPostListProps) => {
    const { user } = useUserContext();

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-5xl mx-auto w-full">
            {posts.map((post) => (
                <li key={post.$id} className="relative aspect-square">
                    <Link to={`/posts/${post.$id}`} className="block w-full h-full rounded-[24px] overflow-hidden group cursor-pointer border border-dark-4 bg-dark-2">
                        <img
                            src={post.imageURL?.toString() || "/assets/icons/profile-placeholder.svg"}
                            alt="post"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-[24px]" />

                        {/* Stats */}
                        {showStats && (
                            <div className="absolute bottom-4 right-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <PostStats post={post} userId={user?.id} />
                            </div>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default GridPostList;
