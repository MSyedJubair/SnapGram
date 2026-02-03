import { bottombarLinks } from "@/Constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const pathname = useLocation();

  return (
    <section className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-dark-2 to-dark-3 border-t border-white/10 backdrop-blur-lg">
      <div className="flex justify-around items-center px-6 py-3">
        {bottombarLinks.map((link) => {
          const isActive = pathname.pathname === link.route;

          return (
            <Link
              key={link.label}
              to={link.route}
              className={`
                flex flex-col items-center justify-center gap-1
                px-4 py-2 rounded-xl transition-all duration-300
                ${isActive 
                  ? "bg-[#877EFF] shadow-md shadow-[#877EFF]/30" 
                  : "hover:bg-white/10"}
              `}
            >
              <img
                src={link.imgURL}
                alt="Link Icon"
                width={22}
                height={22}
                className={`transition ${
                  isActive
                    ? "invert brightness-0"
                    : "group-hover:invert group-hover:brightness-0"
                }`}
              />

              <p
                className={`text-xs font-medium ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
