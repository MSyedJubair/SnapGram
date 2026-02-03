import { Spinner } from "@/components/ui/spinner";
import { useGetusers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { data: users, isLoading, isError } = useGetusers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
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
    <div className="p-6 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        All Users
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 rounded-xl p-5 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={user.imageURL || '../assets/icons/profile-placeholder.svg'}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-indigo-500"
            />
            <h2 className="text-xl font-semibold text-white">{user.name}</h2>
            <p className="text-indigo-400">@{user.username}</p>
            <p className="text-gray-300 mt-1 text-sm">{user.email}</p>
            <p className="text-gray-400 mt-3 text-sm">{user.bio}</p>
            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
