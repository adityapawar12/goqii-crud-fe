import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

function NavLink({
  children,
  title,
  href,
  level,
}: {
  children?: React.ReactNode;
  title: string;
  href: string;
  level: number;
}) {
  const location = useLocation();

  return (
    <Link to={href}>
      <div
        className={cn(
          "text-black w-full py-1 px-4 lg:px-6 font-normal text-lg",
          level === 1 && "mx-0",
          level === 2 && "ml-2 w-[calc(100%-0.5rem)]"
        )}
      >
        <div
          className={cn(
            location.pathname === href
              ? "flex flex-row justify-start items-center gap-2 px-2 py-2 rounded-md bg-[#FEAF00]"
              : "flex flex-row justify-start items-center gap-2 px-2 py-2 rounded-md hover:bg-[#FEAF00] group"
          )}
        >
          {children && (
            <div
              className={
                "text-black rounded w-7 h-7 flex justify-center items-center"
              }
            >
              {children}
            </div>
          )}
          <span>{title}</span>
        </div>
      </div>
    </Link>
  );
}

export default NavLink;
