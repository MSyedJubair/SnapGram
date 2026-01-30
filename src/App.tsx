import { Route, Routes } from 'react-router-dom'

import './globals.css'
import {
  Home,
  Explore,
  Saved,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  AllUsers,
} from "./_root/Pages";
import SigninForm from './_auth/Forms/SigninForm'
import SignupForm from './_auth/Forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/sonner"


const App = () => {
  return (
    <main className='flex h-screen'>
      <Toaster />
      <Routes>
        // Private Routes
        <Route element={<AuthLayout/>}>
          <Route path='/sign-up' element={<SignupForm/>} />
          <Route path='/sign-in' element={<SigninForm/>} />
        </Route>

        // Public Routes
        <Route element={<RootLayout/>}>
          <Route index element={ <Home/> }/>
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>

      </Routes>
    </main>
  )
}

export default App