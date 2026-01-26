import type { INewUser } from "..";
import { account, appwrite_config, avatars, table } from "./config";
import { ID } from "appwrite";



export const createUserAccount = async (user: INewUser) => {
    try {
        const newAccount = account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB(
            {
                accountId: (await newAccount).$id,
                email: (await newAccount).email,
                name: (await newAccount).name,
                username: user.username,
                imageURL: avatarUrl
            }
        )

        return newUser
    } catch (error) {
        console.log(error)
    }
}

export const saveUserToDB = async (user:{
    accountId: string
    email: string
    name: string
    imageURL: string
    username: string
}) => { 
    try {
        const newUser = table.createRow({
            databaseId: appwrite_config.databaseID,
            tableId: appwrite_config.userCollectionID,
            rowId: ID.unique(),
            data: user
        })

        return newUser
    } catch (error) {
        console.log(error)
    }
 }