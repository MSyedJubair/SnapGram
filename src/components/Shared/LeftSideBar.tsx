import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignoutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/Constants";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const pathname = useLocation();

  const { mutateAsync: signOut, isSuccess } = useSignoutAccount();
  const { user } = useUserContext();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);

  return (
    <nav
      className={`hidden md:flex flex-col justify-between h-screen 
      bg-gradient-to-b from-dark-2 to-dark-3 border-r border-white/10 backdrop-blur-lg
      transition-all duration-300 ease-in-out
      ${isOpen ? "w-72 px-6 py-8" : "w-20 px-3 py-8 items-center"}`}
    >
      {/* TOP */}
      <div className="flex flex-col w-full gap-10">

        {/* LOGO + TOGGLE */}
        <div className={`flex ${isOpen ? "justify-between" : "justify-center"} items-center`}>
          {isOpen ? (
            <Link
              to="/"
              className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl"
            >
              <img
                src="../assets/images/logo.svg"
                alt="logo"
                className=" rounded-lg"
              />
            </Link>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <img
                src="../assets/icons/menu.svg"
                alt="toggle"
                className="w-5 h-5 invert"
              />
            </button>
          )}

          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition"
            >
              <img
                src="../assets/icons/menu.svg"
                alt="toggle"
                className="w-5 h-5 invert"
              />
            </button>
          )}
        </div>

        {/* USER PROFILE */}
        <Link
          to={`/profile/${user.id}`}
          className={`flex items-center ${isOpen ? "gap-4 px-3 py-3" : "justify-center w-12 h-12"
            } rounded-xl bg-white/5 hover:bg-white/10 transition`}
        >
          <img
            src={user.imageUrl || "../assets/icons/profile-placeholder.svg"}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border border-white/20"
          />
          {isOpen && (
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                @{user.username}
              </p>
            </div>
          )}
        </Link>

        {/* NAV LINKS */}
        <ul className="flex flex-col gap-2 w-full">
          {sidebarLinks.map((link) => {
            const isActive = pathname.pathname === link.route;

            return (
              <li key={link.label} className="w-full">
                <NavLink
                  to={link.route}
                  className={`flex items-center transition-all duration-200 rounded-xl
                  ${isOpen
                      ? "gap-4 px-4 py-3"
                      : "justify-center w-12 h-12 mx-auto"
                    }
                  ${isActive
                      ? "bg-[#877EFF]"
                      : "hover:bg-white/10"
                    }`}
                >
                  <img
                    src={link.imgURL}
                    alt="icon"
                    className={`w-5 h-5 transition-all duration-200 ${isActive
                      ? "invert brightness-0"
                      : "opacity-70"
                      }`}
                  />

                  {isOpen && (
                    <span
                      className={`text-sm font-medium ${isActive
                        ? "text-white"
                        : "text-gray-300"
                        }`}
                    >
                      {link.label}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* LOGOUT */}
      <Button
        onClick={() => signOut()}
        variant="ghost"
        className={`transition rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400
        ${isOpen
            ? "flex items-center gap-4 px-4 py-3"
            : "flex justify-center w-12 h-12"
          }`}
      >
        <img
          src="../assets/icons/logout.svg"
          alt="logout"
          className="w-5 h-5"
        />
        {isOpen && (
          <span className="text-sm font-medium">
            Logout
          </span>
        )}
      </Button>
    </nav>
  );
};

export default LeftSideBar;
