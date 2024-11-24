import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./firebaseConnection";

interface Album {
    title: string;
    artist: string;
    releaseYear: number;
    userEmail: string;
    coverImage: string;
    createdAt: string;
}

export async function createAlbum(albumData: Omit<Album, 'createdAt'>) {
    try {
        const albumsRef = collection(db, "albums");
        const newAlbum = {
            ...albumData,
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(albumsRef, newAlbum);
        return { id: docRef.id, ...newAlbum };
    } catch (error) {
        console.error("Erro ao criar álbum:", error);
        throw error;
    }
}

export async function getUserAlbums(userEmail: string) {
    try {
        const albumsRef = collection(db, "albums");
        const q = query(
            albumsRef, 
            where("userEmail", "==", userEmail),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Erro ao buscar álbuns:", error);
        throw error;
    }
}

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};
