import { Models } from "react-native-appwrite";

export interface Habit extends Models.Row {
    name: string;
    description: string;
    frequency: "daily" | "weekly" | "monthly";
    streakCount: number;
    lastCompleted: string | null; 
    icon: string;
}

export interface RealtimeResponse {
    events: string[];
    payload: Models.Row;
}