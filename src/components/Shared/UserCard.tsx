import { Link } from "react-router-dom";
import type { IUser } from "@/types";

type UserCardProps = {
    user: IUser;
};

const UserCard = ({ user }: UserCardProps) => {
    return (
        <Link to={`/profile/${user.id}`} className="flex flex-col items-center justify-center p-5 lg:p-7 border border-dark-4 rounded-3xl bg-dark-2 w-full min-w-[200px] hover:border-dark-3 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
            <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="creator"
                className="rounded-full w-14 h-14 lg:w-20 lg:h-20 object-cover mb-4 border-2 border-primary-500"
            />

            <div className="flex flex-col items-center gap-1 w-full">
                <p className="text-base font-medium text-light-1 text-center line-clamp-1 w-full">
                    {user.name}
                </p>
                <p className="text-sm text-light-3 text-center line-clamp-1 w-full">
                    @{user.username}
                </p>
            </div>

            <button className="mt-5 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors w-full max-w-[120px]">
                Follow
            </button>
        </Link>
    );
};

export default UserCard;
