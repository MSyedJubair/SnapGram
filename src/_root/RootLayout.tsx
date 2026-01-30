import BottomBar from '@/components/Shared/BottomBar'
import LeftSideBar from '@/components/Shared/LeftSideBar'
import TopBar from '@/components/Shared/TopBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'

const RootLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext()

  if (isLoading) {
    return <div className='w-full h-screen flex items-center justify-center'>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to={'/sign-up'} />
  }

  return (
    <div className='w-full md:flex'>
      <TopBar/>
      <LeftSideBar/>

      <section>
        <Outlet/>
      </section>

      <BottomBar/>
    </div>
  )
}

export default RootLayout