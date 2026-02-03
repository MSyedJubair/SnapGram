import { createPost, createUserAccount, deleteSavePost, getAllPosts, getAllUsers, getCurrentUser, getPost, getPostByIds, getRecentPosts, getSaves, likeThePost, savePost, SignInAccount, signOutAccount, updatePost } from '../appwrite/api'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
        onMutate: async ({postId, userId}) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({
                queryKey: ['getSaves']
            })

            // Snapshot previous data
            const previousSaves = queryClient.getQueryData(['getSaves'])

            // Optimistically update cache
            queryClient.setQueryData(['getSaves'], (old: any) => [
                ...old,
                { post: postId, userId }
            ])

            return { previousSaves }
        },
        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousSaves) {
                queryClient.setQueryData(['getSaves'], context.previousSaves)
            }
        },
        onSuccess: () => {
            // Only invalidate if needed
            queryClient.invalidateQueries({
                queryKey: ['getSaves']
            })
        }
    })
}
export const useDeleteSavePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (saveRecordId:string) => deleteSavePost(saveRecordId),
        onMutate: async (saveRecordId) => {
            await queryClient.cancelQueries({
                queryKey: ['getSaves']
            })

            const previousSaves = queryClient.getQueryData(['getSaves'])

            queryClient.setQueryData(['getSaves'], (old: any) =>
                old.filter((save: any) => save.$id !== saveRecordId)
            )

            return { previousSaves }
        },
        onError: (err, variables, context) => {
            if (context?.previousSaves) {
                queryClient.setQueryData(['getSaves'], context.previousSaves)
            }
        },
        onSuccess: () => {
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
export const useGetSavedPosts = (postIds: string[]) => {
  return useQuery({
    queryKey: ['GetSavedPosts', postIds],
    queryFn: () => getPostByIds(postIds)
  });
};
export const useUpdatePost = () => {
    return useMutation({
        mutationFn: ({postId, post}:{postId:string, post:INewPost}) => updatePost(postId, post)
    })
}
export const useGetusers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_USERS],
        queryFn: () => getAllUsers()
    })
}
export const useInfinitePosts = (searchQuery='') => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS, searchQuery],
        queryFn: ({ pageParam }) => getAllPosts(pageParam, searchQuery),
        getNextPageParam: (lastPage) => {
            if (lastPage?.length === 0) return undefined

            return lastPage[lastPage?.length - 1].$id
        },
        initialPageParam: null,
    })
}