import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConnection";
import { MusicData } from "@/types/music";

export async function createMusic(musicData: MusicData) {
    try {
        const musicsRef = collection(db, "musics");
        const newMusic = {
            ...musicData,
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(musicsRef, newMusic);
        return { id: docRef.id, ...newMusic };
    } catch (error) {
        console.error("Erro ao criar música:", error);
        throw error;
    }
} 