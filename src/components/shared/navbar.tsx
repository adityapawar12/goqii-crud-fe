import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideNav from "./sidenav";

function Navbar() {
  return (
    <header className="w-full bg-[#F2EAE1]">
      <div className="w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto p-4 md:px-6">
        <Sheet>
          <SheetTrigger className="flex flex-row justify-start items-center gap-2">
            <SheetTitle className="sr-only">test</SheetTitle>
            <div className="text-black w-full font-semibold text-xl flex flex-row justify-start items-center gap-2">
              <span>
                <Menu />
              </span>
              <h2>CRUD</h2>
            </div>
          </SheetTrigger>

          <SheetContent side={"left"} className="p-0 m-0 w-72">
            <SheetDescription className="sr-only">SideNav</SheetDescription>
            <SideNav>
              <SheetClose>
                <X />
              </SheetClose>
            </SideNav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
