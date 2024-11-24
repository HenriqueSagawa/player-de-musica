import { db } from "./firebaseConnection";
import { getDocs, query, where, collection, updateDoc, doc, QuerySnapshot } from "firebase/firestore";

export async function updateUserName(email: string, newName: string) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email)); 
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Usuário não encontrado.");
      return; 
    }

    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, { name: newName })
        .then(() => {
          console.log("Nome atualizado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao atualizar nome:", error);
        });
    });
  } catch (error) {
    console.error("Erro ao atualizar nome:", error);
  }
}