import type { INewPost, INewUser } from "../../types";
import { account, appwrite_config, avatars, storage, table } from "./config";
import { ID, Query } from "appwrite";



export const createUserAccount = async (user: INewUser) => {
    try {
        // Create the account in appwrite
        const newAccount = await account.create({
            userId: ID.unique(),
            email: user.email,
            password: user.password,
            name: user.name
        })
        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(user.name)

        // Save the account to a seperate Users table to use it further
        const newUser = await saveUserToDB({
            accountID: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            username: user.username,
            imageURL: avatarUrl
        })

        return newUser
    } catch (error) {
        console.log(error)
        return null
    }
}

export const saveUserToDB = async (user:{
        accountID: string
        email: string
        name: string
        imageURL: string
        username: string
    }) => { 
    try {
        const newUser = await table.createRow({
            databaseId: appwrite_config.databaseID,
            tableId: appwrite_config.userCollectionID,
            rowId: ID.unique(),
            data: user,
        })

        return newUser
    } catch (error) {
        console.log(error)
        return null
    }
}

export const SignInAccount = async (user:{
        email: string
        password: string
    }) => {
    try {
        // Create a session
        const session = await account.createEmailPasswordSession({
            email: user.email, 
            password: user.password
        })

        return session
        
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) {
            console.log("Didn't find the user")
            return false
        }
        
        const currentUser = await table.listRows({
            databaseId: appwrite_config.databaseID,
            tableId: appwrite_config.userCollectionID,
            queries: [
                Query.equal('accountID', currentAccount.$id)
            ]
        })

        if (!currentUser) throw Error("Not getting the User using the account from database")
        
        return currentUser.rows.length > 0 ? currentUser.rows[0] : null
        
    } catch (error) {
        console.log(error)
        return false
    }
}

export const signOutAccount = async () => {
    try {
        const session = await account.deleteSession({sessionId: 'current'}) // Delete the current session
        return session
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (post:INewPost) => {
    try {
        // Upload image to storage
        const uploadedFile = await uploadFile(post.file[0])   
        
        if (!uploadedFile) throw Error

        // Get file url
        const fileUrl = await getFilePreview(uploadedFile?.$id || '')

        // Can't get the file so delete itttt
        if (!fileUrl) {
            await await deleteFile(uploadedFile?.$id || '')
            throw Error
        }

        // Convert tags to array
        const tags = post.tags?.replace(/ /g, '').split(',') || [] 

        // Save post to database
        const newPost = await table.createRow({
            databaseId: appwrite_config.databaseID,
            tableId: appwrite_config.postCollectionID,
            rowId: ID.unique(),
            data: {
                Creator: post.userId,
                Caption: post.caption,
                imageURL: fileUrl,
                imageID: uploadedFile?.$id,
                location: post.location,
                Tags: tags
            }
        })

        if (!newPost) {
            await deleteFile(uploadedFile?.$id || '')   
            throw Error
        }     

        return newPost

    } catch (error) {
        console.log(error);
    }
}

export const uploadFile = async (file: File) => {
    try {
        const uploadedFile = await storage.createFile({
            bucketId: appwrite_config.storageID,
            fileId: ID.unique(),
            file: file
        })

        return uploadedFile
    } catch (error) {
        console.log(error);
    }
}

export const getFilePreview = (fileId: string) => {
    try {
        const fileUrl = storage.getFilePreview({
            bucketId: appwrite_config.storageID,
            fileId: fileId,
        })
        return fileUrl
    } catch (error) {
        console.log(error);
    }
}

export const deleteFile = async (fileId:string) => {
    try {
        storage.deleteFile({
            bucketId: appwrite_config.storageID,
            fileId: fileId
        })
        return true
    } catch (error) {
        console.log(error);
        return false        
    }
}

