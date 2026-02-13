import { useGetusers } from "@/lib/react-query/queriesAndMutations";
import UserCard from "@/components/Shared/UserCard";
import { Spinner } from "@/components/ui/spinner";

const AllUsers = () => {
  const { data: creators, isLoading, isError } = useGetusers();

  if (isError) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        <p className="text-red-500 font-medium">Something went wrong.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center overflow-hidden py-10 px-5 md:px-8 lg:p-14">
      <div className="max-w-5xl flex flex-col items-start w-full gap-10">
        <h2 className="text-2xl font-bold md:text-3xl text-left w-full">All Users</h2>
        
        {isLoading && !creators ? (
          <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
            <Spinner/>
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full max-w-5xl">
            {creators?.map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={creator as any} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;