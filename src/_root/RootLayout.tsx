import BottomBar from '@/components/Shared/BottomBar'
import LeftSideBar from '@/components/Shared/LeftSideBar'
import TopBar from '@/components/Shared/TopBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from '@/context/AuthContext'
import { Spinner } from '@/components/ui/spinner'

const RootLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext()

  if (isLoading) {
    return <div className='w-full h-screen flex items-center justify-center g-6'><Spinner className='size-8'/><p>Loading...</p></div>
  }

  if (!isAuthenticated) {
    return <Navigate to={'/sign-up'} />
  }

  return (
    <div className='w-full md:flex'>
      <TopBar/>
      <LeftSideBar/>

      <section className='flex flex-1 h-full'>
        <Outlet/>
      </section>

      <BottomBar/>
    </div>
  )
}

export default RootLayout