import {
  useMutation,
} from '@tanstack/react-query'
import { createUserAccount, SignInAccount } from '../appwrite/api'
import type { INewUser } from '../../types'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email:string
            password:string
        }) => { return SignInAccount(user)}
    })
}