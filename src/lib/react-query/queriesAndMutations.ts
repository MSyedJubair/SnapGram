import { createPost, createUserAccount, deleteSavePost, getCurrentUser, getPost, getRecentPosts, getSaves, likeThePost, savePost, SignInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { INewPost, INewUser } from '../../types'
import { QUERY_KEYS } from './QueryKeys'

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
    const QueryClient = useQueryClient()

    return useMutation({
        mutationFn: (post: INewPost) => { return createPost(post) },
        onSuccess: () => {
            QueryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}
export const useRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: () => getRecentPosts() 
    })
}
export const useSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, userId}:{postId: string, userId: string}) => savePost(userId, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}
export const useDeleteSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (saveRecordId:string) => deleteSavePost(saveRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
            queryClient.invalidateQueries({
                queryKey: ['getSaves']
            })
        }
    })
}
export const useLikePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId, likesArray}:{postId: string, likesArray: string[]}) => likeThePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}
export const useGetUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: () => getCurrentUser()
    })
}
export const useGetSaves = () => {
    return useQuery({
        queryKey: ['getSaves'],
        queryFn: () => getSaves()
    })
}
export const useGetPost = (postId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID],
        queryFn: () =>  getPost(postId) 
    })
}
export const useUpdatePost = () => {
    return useMutation({
        mutationFn: ({postId, post}:{postId:string, post:INewPost}) => updatePost(postId, post)
    })
}