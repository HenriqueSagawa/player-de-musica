import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/services/firebaseConnection";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import bcryptjs from "bcryptjs";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email"},
                password: { label: "password", type: "password"},
            },
            async authorize(credentials: any, req: any): Promise<any> {
                try {
                    const usersRef = collection(db, "users");
                    const q = query(usersRef, where("email", "==", credentials.email));
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        return null;
                    }

                    const user = querySnapshot.docs[0].data();
                    const isValid = await bcryptjs.compare(credentials.password, user.password);

                    if (!isValid) {
                        return null;
                    }

                    return {
                        id: querySnapshot.docs[0].id,
                        name: user.name,
                        email: user.email,
                        image: user.photoUrl
                    };

                } catch (err) {
                    return null;
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string
})

export { handler as GET, handler as POST };