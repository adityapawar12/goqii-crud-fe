import { useQuery } from "@tanstack/react-query";
import UserCard from "./user-card";
import { IUser } from "./users-page";
import axiosClient from "@/lib/axios-client";

function UsersList() {
  const {
    isPending: usersIsPending,
    isError: usersIsError,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosClient.get("/api/v1/users").then((res) => res.data.data),
  });

  if (usersIsError) {
    return (
      <h1 className="w-full text-center font-semibold text-xl">
        Something went wrong while fetching users data!
      </h1>
    );
  }

  return (
    <>
      <div className="text-gray-500 py-4 px-6 hidden lg:flex flex-row justify-between items-center">
        <p className="min-w-32">Name</p>
        <p className="min-w-80">Email</p>
        <p className="min-w-32">Phone</p>
        <p className="min-w-32">DOB</p>
        <div className="min-w-28 flex justify-end"></div>
      </div>

      <div className="flex flex-col gap-4">
        {usersIsPending && <>Loading...</>}
        {users && users.length === 0 && (
          <h1 className="w-full text-center py-2 font-semibold text-xl">
            No users found!
          </h1>
        )}
        {users &&
          users.length > 0 &&
          users.map((user: IUser) => (
            <div key={user.id}>
              <UserCard
                id={user.id}
                name={user.name}
                email={user.email}
                dob={user.dob}
                phone={user.phone}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default UsersList;
