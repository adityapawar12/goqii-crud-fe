import { UserRound } from "lucide-react";
import NavLink from "./navlink";

function SideNav({ children }: { children: React.ReactNode }) {
  return (
    <section className="side-navbar w-72 h-screen bg-[#F2EAE1]">
      <div className="text-black w-full py-4 px-4 lg:px-6 font-semibold text-xl flex flex-row justify-between items-center">
        <h2>CRUD</h2>

        <span>{children}</span>
      </div>

      <div className="flex flex-col justify-between h-[calc(100vh-72px)]">
        <div>
          <NavLink level={1} title={"Users"} href={"/users"}>
            <UserRound />
          </NavLink>

          <NavLink level={2} title={"Create"} href={"/users/create"}></NavLink>
        </div>
      </div>
    </section>
  );
}

export default SideNav;
