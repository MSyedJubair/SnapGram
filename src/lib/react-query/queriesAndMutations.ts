import {
  useMutation,
} from '@tanstack/react-query'
import { createPost, createUserAccount, SignInAccount, signOutAccount } from '../appwrite/api'
import type { INewPost, INewUser } from '../../types'

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
export const useSignoutAccount = () => {
    return useMutation({
        mutationFn: () => { return signOutAccount()}
    })
}
export const useCreatePost = () => { 
    return useMutation({
        mutationFn: (post: INewPost) => { return createPost(post) }
    })
}