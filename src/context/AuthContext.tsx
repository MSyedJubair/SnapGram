import { getCurrentUser } from '@/lib/appwrite/api'
import type { IUser } from '@/types'
import React, {createContext, useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


export const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading:false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean
}

const AuthContext = createContext(INITIAL_STATE)

export const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const [User, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate()

    const checkAuthUser = async () => {
        setIsLoading(true)
        try {
            const currentUser = await getCurrentUser()

            if (currentUser) {
                setUser({
                    id: currentUser?.$id,
                    name: currentUser?.name,
                    username: currentUser?.username,
                    email: currentUser?.email,
                    imageUrl: currentUser?.imageURL,
                    bio: currentUser?.bio
                })
                setIsAuthenticated(true)
                return true
            }

            return false

            
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { 
        if (localStorage.getItem('cookieFallback') === '[]'){
            navigate('/sign-in')
        }
        checkAuthUser()
         }, [navigate])

    const value = {
        user: User,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export const useUserContext = () => useContext(AuthContext)