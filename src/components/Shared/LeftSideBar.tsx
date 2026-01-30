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

  useEffect(() => { if (isSuccess) navigate(0)}, [isSuccess])

  return (
    <nav className='hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-dark-2'>
      <div className='flex flex-col gap-11'>
        <Link to={'/'}>
          <img src="./assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Link>

        <Link to={`/profile${user.id}`} className='flex items-center gap-3'>
            <img src={user.imageUrl || './assets/icons/profile-placeholder.svg'} alt="Profile-Photo" className='h-8 w-8 rounded-full'/>
            <div className='flex flex-col'>
              <p className='text-[18px] font-bold leading-[140%]'>{user.name}</p>
              <p className='text-[14px] font-normal leading-[140%] text-gray-700'>@{user.username}</p>
            </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {
            sidebarLinks.map((link) => {
              const isActive = pathname.pathname === link.route 
              return (
              <li key={link.label} className={`rounded-lg base-medium hover:bg-[#877EFF] transition group ${isActive && "bg-[#877EFF]"}`}>
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img src={link.imgURL} alt="Link-Image" className={`group-hover:invert group-hover:brightness-0 transition ${isActive && "invert brightness-0 "}`}/>
                  {link.label}
                </NavLink>
              </li>
            )})
          }
        </ul>
      </div>
      <Button onClick={() => { signOut() }} variant={'ghost'} className='flex gap-4 items-center justify-start hover:bg-transparent hover:text-white'>
        <img src="./assets/icons/logout.svg" alt="Logout" width={24}/>
        <p className='text-[14px] font-medium leading-[140%] lg:text-[16px] lg:font-medium lg:leading-[140%]'>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSideBar