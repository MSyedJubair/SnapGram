import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/appwrite/api'
import type { IUser } from '@/types'


// Setting an initial state of the user so TS knows what're we doing
const INITIAL_USER = {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading:true,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean
}

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

// Creating the Context using React Hook    
const AuthContext = createContext<IContextType>(INITIAL_STATE)

// Creating the Provider - Using which the data will be passed
export const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const [User, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async (): Promise<boolean> => {
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
            setIsAuthenticated(false)
            return false
            
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkAuthUser()
        }, [])

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

// Creating Custom Hook
export const useUserContext = () => useContext(AuthContext)