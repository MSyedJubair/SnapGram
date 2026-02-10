import { bottombarLinks } from "@/Constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <section className="fixed bottom-0 z-50 w-full md:hidden bg-background/80 backdrop-blur-xl border-t border-border pb-5">
      <div className="flex items-center justify-between w-full max-w-lg mx-auto px-6 py-3">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              key={link.label}
              to={link.route}
              className={`
                group flex flex-col items-center gap-1 p-2 transition-all duration-300 rounded-xl
                min-w-16 
                ${isActive
                  ? "bg-[#877EFF] text-primary-foreground shadow-lg shadow-primary/25 translate-y-[-2px]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"}
              `}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`transition-all duration-300 w-5 h-5 ${isActive
                  ? "brightness-0 invert dark:invert-0"
                  : "opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 dark:invert"
                  } ${isActive ? "scale-110" : ""}`}
              />

              <span className={`text-[10px] font-medium tracking-wide ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
