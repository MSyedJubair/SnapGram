import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignoutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { sidebarLinks } from '@/Constants'

const LeftSideBar = () => {
  const navigate = useNavigate()
  const pathname = useLocation()

  const { mutateAsync: signOut, isSuccess } = useSignoutAccount()
  const { user } = useUserContext()

  useEffect(() => { if (isSuccess) navigate(0) }, [isSuccess, navigate])

  return (
    <nav className="hidden md:flex flex-col justify-between w-72 h-screen px-6 py-8 bg-gradient-to-b from-dark-2 to-dark-3 border-r border-white/10 backdrop-blur-lg">
      
      {/* TOP SECTION */}
      <div className="flex flex-col gap-10">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src="../assets/images/logo.svg"
            alt="logo"
            width={160}
            height={36}
            className="hover:opacity-80 transition"
          />
        </Link>

        {/* USER PROFILE */}
        <Link
          to={`/profile${user.id}`}
          className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
        >
          <img
            src={user.imageUrl || '../assets/icons/profile-placeholder.svg'}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover border border-white/20"
          />
          <div className="flex flex-col">
            <p className="text-base font-semibold text-white">
              {user.name}
            </p>
            <p className="text-sm text-gray-400">
              @{user.username}
            </p>
          </div>
        </Link>

        {/* NAV LINKS */}
        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname.pathname === link.route

            return (
              <li
                key={link.label}
                className={`rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#877EFF] shadow-lg shadow-[#877EFF]/30"
                    : "hover:bg-white/10"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <img
                    src={link.imgURL}
                    alt="Link Icon"
                    className={`w-5 h-5 transition ${
                      isActive
                        ? "invert brightness-0"
                        : "group-hover:invert group-hover:brightness-0"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isActive ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {link.label}
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      {/* LOGOUT */}
      <Button
        onClick={() => { signOut() }}
        variant="ghost"
        className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition"
      >
        <img
          src="../assets/icons/logout.svg"
          alt="Logout"
          width={20}
        />
        <span className="text-sm font-medium">
          Logout
        </span>
      </Button>
    </nav>
  )
}

export default LeftSideBar
