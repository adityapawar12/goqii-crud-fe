import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UsersList from "./users-list";
import { Link } from "react-router-dom";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  dob: string;
  created_at: string;
}

function UsersPage() {
  return (
    <div className="w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto p-4 md:px-6">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Students List
        </h1>

        <Link to={"/users/create"}>
          <Button className="bg-[#FEAF00] hover:bg-[#ffc446] text-white px-4 sm:px-6 py-4 text-base sm:text-lg md:text-xl">
            Add New User
          </Button>
        </Link>
      </div>

      <Separator className="bg-gray-300 my-4" />

      <UsersList />
    </div>
  );
}

export default UsersPage;
