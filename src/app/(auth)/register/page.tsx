"use client";

import { Button, Card, Input, Link } from "@nextui-org/react";
import { useState, useEffect } from "react";
import googleIcon from "@/../public/assets/img/google.png";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import Image from "next/image";
import { db } from "@/services/firebaseConnection";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import bcryptjs from 'bcryptjs';
import { signIn, useSession } from "next-auth/react";

export default function Register() {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push("/");
        }
    }, [session, router]);

    const [errorUser, setErrorUser] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const User = z.object({
        name: z.string().min(1, { message: "Nome é obrigatório" }),
        email: z.string().min(1, { message: "Email é obrigatório" }).email({ message: "Email inválido" }),
        password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    });

    type User = z.infer<typeof User>

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<User>({
        resolver: zodResolver(User),
        mode: "onChange"
    });

    const onSubmit = async (data: User) => {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", data.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                setErrorUser(true);
                return;
            }

            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(data.password, salt);

            await addDoc(collection(db, "users"), {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                photoUrl: ""
            });

            router.push("/");
        } catch (err) {
            console.log(err);
            setErrorUser(true);
        }
    };

    return (
        <div className="w-full h-screen">
            <main className="w-full mt-12 flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600 space-y-5">
                    <div className="text-center pb-8">
                        <div className="">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl dark:text-gray-300 mt-5">
                                Cadastre sua conta
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div>
                            <Input
                                {...register("name")}
                                type="text"
                                variant="bordered"
                                label="Nome completo"
                                isInvalid={!!errors.name}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                {...register("email")}
                                type="email"
                                variant="bordered"
                                label="Email"
                                isInvalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Input
                                {...register("password")}
                                variant="bordered"
                                label="Senha"
                                isInvalid={!!errors.password}
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={() => setIsVisible(!isVisible)}
                                    >
                                        {isVisible ? (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <Button type="submit" color="primary" variant="solid">
                            Cadastrar
                        </Button>

                        {errorUser && (
                            <p className="text-sm text-red-600 text-center">Usuário já existe</p>
                        )}
                    </form>

                    <Button
                        onClick={() => signIn('google')}
                        color="default"
                        variant="bordered"
                        className="w-full"
                    >
                        <Image src={googleIcon} alt="" width={20} height={20} />
                        Continuar com o Google
                    </Button>
                    <Button onClick={() => signIn('github')} color="default" variant="bordered" className="w-full">
                        <FaGithub className="text-2xl text-default-400" />
                        Continuar com o Github
                    </Button>

                    <p className="text-center">
                        Já possui conta?{" "}
                        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Entrar
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
