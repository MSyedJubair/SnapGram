import { Route, Routes } from 'react-router-dom'

import './globals.css'
import { Home } from './_root/Pages'
import SigninForm from './_auth/Forms/SigninForm'
import SignupForm from './_auth/Forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'


const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        // Private Routes
        <Route element={<AuthLayout/>}>
          <Route path='/sign-up' element={<SignupForm/>} />
          <Route path='/sign-in' element={<SigninForm/>} />
        </Route>

        // Public Routes
        <Route element={<RootLayout/>}>
          <Route index element={ <Home/> }/>
        </Route>

      </Routes>
    </main>
  )
}

export default App