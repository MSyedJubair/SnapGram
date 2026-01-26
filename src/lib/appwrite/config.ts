import { Client, Account, Databases, Storage, Avatars, TablesDB } from 'appwrite';

export const appwrite_config = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    projectEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageID: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionID: "users",
    postCollectionID: "posts",
    saveCollectionID: "saves"
}

export const client = new Client();
client
    .setEndpoint(appwrite_config.projectEndpoint)
    .setProject(appwrite_config.projectId); 


export const account = new Account(client);
export const databases = new Databases(client);
export const table = new TablesDB(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);