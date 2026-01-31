import { bottombarLinks } from "@/Constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const pathname = useLocation();

  return (
    <section className="z-50 flex justify-between items-end w-full sticky bottom-0 h-screen rounded-4xl bg-dark-2 px-5 py-4 md:hidden">
      {bottombarLinks.map((link) => {
        const isActive = pathname.pathname === link.route;
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`
                flex
                flex-col
                justify-center
                items-center
                gap-1
                rounded-lg
                p-3
                base-medium
                hover:bg-[#877EFF]
                transition
                group
                ${isActive && "bg-[#877EFF]"}
            `}
          >
            <img
              src={link.imgURL}
              alt="Link-Image"
              width={20}
              height={20}
              className={`
                  group-hover:invert
                  group-hover:brightness-0
                  transition
                  ${isActive && "invert brightness-0 "}`}
            />

            <p className="text-sm">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default BottomBar;
