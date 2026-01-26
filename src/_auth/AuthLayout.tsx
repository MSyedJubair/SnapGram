import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false)

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={'/'} />
      ): (
        <>
          <section className='flex flex-1 justify-center items-center mx-7 md:mx-1'>
            <Outlet/>
          </section>

          <img src="./assets/images/side-img.svg" alt="Side Image" className='hidden md:block w-1/2 object-cover bg-no-repeat'/>
        </>
      )}
    </>
  )
}

export default AuthLayout