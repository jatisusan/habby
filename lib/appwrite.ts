import { Client, Account, Databases } from 'react-native-appwrite';


export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) 
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)   
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME!);  

export const account = new Account(client);
export const db = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
export const HABITS_TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID!;

