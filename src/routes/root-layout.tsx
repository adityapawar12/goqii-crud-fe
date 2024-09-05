import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/navbar";

function RootLayout() {
  return (
    <div className="flex flex-row justify-start items-start">
      <section className="bg-[#E5E5E5] w-screen min-h-screen">
        <Navbar />

        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
}

export default RootLayout;
