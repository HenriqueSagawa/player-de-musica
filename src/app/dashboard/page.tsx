"use client";

import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Button, Card, CardBody, CardHeader, Input, Spinner, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { FaEdit, FaPlus, FaCamera, FaMusic, FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { updateUserName } from "@/services/setFirebaseData";
import { createAlbum, getUserAlbums, fileToBase64 } from "@/services/albumService";
import { db } from "@/services/firebaseConnection"
import { collection, query, orderBy, where, onSnapshot, } from "firebase/firestore"
import { toast } from "react-hot-toast";
import Image from "next/image";
import { InputFile } from "@/components/inputFile";
import { createMusic } from "@/services/musicService";

interface MusicFormData {
    title: string;
    artist: string;
}

interface DashboardProps {
    session: any;
}

export default function Dashboard() {
    const { data: serverSession, status, update } = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAlbumOpen, onOpen: onAlbumOpen, onClose: onAlbumClose } = useDisclosure();
    const { isOpen: isViewAlbumOpen, onOpen: onViewAlbumOpen, onClose: onViewAlbumClose } = useDisclosure();
    const { isOpen: isMusicOpen, onOpen: onMusicOpen, onClose: onMusicClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState(serverSession?.user?.image || "");
    const [albumCover, setAlbumCover] = useState<string>("");
    const [albums, setAlbums] = useState<any[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
    const [musics, setMusics] = useState<any[]>([]);
    const [albumMusics, setAlbumMusics] = useState<any[]>([]);
    const [musicFile, setMusicFile] = useState<File | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [musicUrl, setMusicUrl] = useState<string>("");
    const [uploadError, setUploadError] = useState<string>("");
    const [formData, setFormData] = useState<MusicFormData>({
        title: "",
        artist: "",
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusic, setCurrentMusic] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const UserSchema = z.object({
        name: z.string().min(1, { message: "Nome é obrigatório" }),
    });

    const AlbumSchema = z.object({
        title: z.string().min(1, "Título é obrigatório"),
        artist: z.string().min(1, "Artista é obrigatório"),
        releaseYear: z.string().transform(val => parseInt(val, 10))
            .refine(val => !isNaN(val) && val > 1900 && val <= new Date().getFullYear(), {
                message: "Ano inválido"
            })
    });

    const MusicSchema = z.object({
        title: z.string().min(1, "Título é obrigatório"),
        artist: z.string().min(1, "Artista é obrigatório"),
        albumId: z.string().min(1, "Álbum é obrigatório")
    });

    const router = useRouter();

    useEffect(() => {
        if (serverSession === null) {
            router.replace("/login");
            return;
        }
    }, [serverSession, router]);

    useEffect(() => {
        if (!serverSession?.user?.email) return;

        console.log("chegou aqui" + serverSession?.user?.email);

        const albunsRef = collection(db, "albums");
        const q = query(
            albunsRef,
            where("userEmail", "==", serverSession?.user?.email),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setAlbums(lista);
        });

        return () => unsubscribe();
    }, [serverSession?.user?.email]);

    useEffect(() => {
        if (!serverSession?.user?.email) return;

        const musicsRef = collection(db, "musics");
        const q = query(
            musicsRef,
            where("userEmail", "==", serverSession?.user?.email),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const lista = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setMusics(lista);
        });

        return () => unsubscribe();
    }, [serverSession?.user?.email]);

    useEffect(() => {
        if (selectedAlbum) {
            const albumMusics = musics.filter(music => music.albumId === selectedAlbum.id);
            setAlbumMusics(albumMusics);
        }
    }, [selectedAlbum, musics]);

    type UserData = z.infer<typeof UserSchema>;
    type AlbumData = z.infer<typeof AlbumSchema>;
    type MusicData = z.infer<typeof MusicSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserData>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: serverSession?.user?.name || "",
        }
    });

    const {
        register: registerAlbum,
        handleSubmit: handleAlbumSubmit,
        formState: { errors: albumErrors },
        reset: resetAlbumForm
    } = useForm<AlbumData>({
        resolver: zodResolver(AlbumSchema)
    });

    const {
        register: registerMusic,
        handleSubmit: handleMusicSubmit,
        formState: { errors: musicErrors },
        reset: resetMusicForm
    } = useForm<MusicData>({
        resolver: zodResolver(MusicSchema)
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar tipo e tamanho
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 5 * 1024 * 1024; // 5MB

            if (!validTypes.includes(file.type)) {
                toast.error("Tipo de arquivo não suportado. Use JPG, PNG ou GIF.");
                return;
            }

            if (file.size > maxSize) {
                toast.error("Arquivo muito grande. Máximo de 5MB.");
                return;
            }

            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAlbumCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAlbumCover(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMusicFile(file);
        }
    };

    const onSubmit = async (data: UserData) => {
        try {
            setLoading(true);
            console.log("Alterando nome do usuário para: " + data.name);
            updateUserName(serverSession?.user?.email as string, data.name);
            signOut();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onAlbumSubmit = async (data: AlbumData) => {
        try {
            setLoading(true);

            if (!serverSession?.user?.email) {
                toast.error("Usuário não autenticado");
                return;
            }

            if (!selectedFile) {
                toast.error("Selecione uma capa para o álbum");
                return;
            }

            // Converter imagem para base64
            const coverImage = await fileToBase64(selectedFile);

            await createAlbum({
                title: data.title,
                artist: data.artist,
                releaseYear: data.releaseYear,
                userEmail: serverSession.user.email,
                coverImage
            });

            const updatedAlbums = await getUserAlbums(serverSession.user.email);
            setAlbums(updatedAlbums);

            toast.success("Álbum criado com sucesso!");
            onClose();
            resetAlbumForm();
            setAlbumCover("");
            onAlbumClose();
            setSelectedFile(null);
            setPreviewUrl("");
        } catch (error) {
            console.error("Erro ao criar álbum:", error);
            toast.error("Erro ao criar álbum");
        } finally {
            setLoading(false);
        }
    };

    const onMusicSubmit = async (data: MusicData) => {
        try {
            setLoading(true);

            if (!serverSession?.user?.email || !musicUrl) {
                toast.error("Usuário não autenticado ou arquivo de música não selecionado");
                return;
            }

            await createMusic({
                title: data.title,
                artist: data.artist,
                albumId: data.albumId,
                musicUrl,
                userEmail: serverSession.user.email
            });

            toast.success("Música adicionada com sucesso!");
            resetMusicForm();
            setMusicFile(null);
            setMusicUrl("");
            onMusicClose();
        } catch (error) {
            console.error("Erro ao criar música:", error);
            toast.error("Erro ao criar música");
        } finally {
            setLoading(false);
        }
    };

    const handleViewAlbum = (album: any) => {
        setSelectedAlbum(album);
        onViewAlbumOpen();
    };

    const handleMusicUploadComplete = (url: string) => {
        setMusicUrl(url);
        setUploadError("");
    };

    const handleMusicUploadError = (error: string) => {
        setUploadError(error);
        setMusicUrl("");
    };

    const validateForm = () => {
        const isValid = formData.title.trim() !== "" &&
            formData.artist.trim() !== "";
        setIsFormValid(isValid);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleInputChange = (field: keyof MusicFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Spinner size="lg" color="secondary" />
            </div>
        )
    }

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handlePlayMusic = (music: any) => {
        setCurrentMusic(music);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.src = music.musicUrl;
            audioRef.current.play();
        }
    };

    const handleNext = () => {
        const currentIndex = albumMusics.findIndex(music => music.id === currentMusic.id);
        if (currentIndex < albumMusics.length - 1) {
            handlePlayMusic(albumMusics[currentIndex + 1]);
        }
    };
    
    const handlePrevious = () => {
        const currentIndex = albumMusics.findIndex(music => music.id === currentMusic.id);
        if (currentIndex > 0) {
            handlePlayMusic(albumMusics[currentIndex - 1]);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="container mx-auto px-6 py-10 flex-grow">
                <h1 className="mb-10 text-4xl font-bold">Meu Perfil</h1>

                <Tabs aria-label="Opções" color="secondary" className="mb-10">
                    <Tab key="perfil" title="Perfil">
                        <Card className="max-w-xl">
                            <CardHeader className="flex items-center justify-between px-6 py-4">
                                <h2 className="text-2xl font-semibold">Informações Pessoais</h2>
                                <Button
                                    isIconOnly
                                    color="secondary"
                                    variant="light"
                                    onClick={onOpen}
                                    className="transition-all hover:scale-105"
                                >
                                    <FaEdit />
                                </Button>
                            </CardHeader>
                            <CardBody className="space-y-6 px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Avatar
                                            isBordered
                                            color="secondary"
                                            src={serverSession?.user?.image || ""}
                                            className="w-20 h-20 text-large"
                                            name={serverSession?.user?.name || ""}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{serverSession?.user?.name}</h3>
                                        <p className="text-gray-500">{serverSession?.user?.email}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <ModalHeader>Editar Perfil</ModalHeader>
                                    <ModalBody>
                                        <Input
                                            {...register("name")}
                                            label="Nome"
                                            variant="bordered"
                                            errorMessage={errors.name?.message}
                                            isInvalid={!!errors.name}
                                        />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button color="primary" type="submit" isLoading={loading}>
                                            Salvar
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalContent>
                        </Modal>
                    </Tab>

                    <Tab key="albuns" title="Meus Álbuns">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card
                                isPressable
                                className="group h-64 cursor-pointer transition-all hover:scale-102"
                                onPress={onAlbumOpen}
                            >
                                <CardBody className="flex items-center justify-center text-center">
                                    <div>
                                        <FaPlus size={28} className="mx-auto mb-3 text-gray-500 group-hover:text-primary" />
                                        <p className="text-lg font-medium">Adicionar Novo Álbum</p>
                                    </div>
                                </CardBody>
                            </Card>

                            {albums.map((album) => (
                                <Card
                                    key={album.id}
                                    isPressable
                                    className="h-64 transition-all hover:scale-102 bg-gradient-to-br from-gray-900 to-gray-800"
                                    onPress={() => handleViewAlbum(album)}
                                >
                                    <CardBody className="flex flex-col justify-between p-6 relative overflow-hidden">
                                        <div className="relative z-10">
                                            <div className="mb-4 relative">
                                                <Image
                                                    src={album.coverImage}
                                                    alt="Capa do álbum"
                                                    width={100}
                                                    height={100}
                                                    className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-white tracking-wide">{album.title}</h3>
                                            <p className="text-sm font-medium text-gray-300">{album.artist}</p>
                                            <p className="text-xs text-gray-400 mt-1">{album.releaseYear}</p>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        <div className="min-h-screen flex flex-col">
                            {currentMusic && (
                                <div className="z-[999] fixed bottom-0 left-0 right-0 bg-gray-900 p-4 shadow-lg">
                                    <div className="container mx-auto flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="text-white">
                                                <h4 className="font-semibold">{currentMusic.title}</h4>
                                                <p className="text-sm text-gray-400">{currentMusic.artist}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center flex-1 mx-8">
                                            <div className="flex items-center gap-4">
                                                <Button
                                                    isIconOnly
                                                    color="default"
                                                    variant="light"
                                                    onClick={handlePrevious}
                                                    isDisabled={currentMusic === 0}
                                                >
                                                    <FaStepBackward />
                                                </Button>

                                                <Button
                                                    isIconOnly
                                                    color="default"
                                                    variant="light"
                                                    onClick={handlePlayPause}
                                                >
                                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                                </Button>

                                                <Button
                                                    isIconOnly
                                                    color="default"
                                                    variant="light"
                                                    onClick={handleNext}
                                                    isDisabled={currentMusic === albumMusics.length - 1}
                                                >
                                                    <FaStepForward />
                                                </Button>
                                            </div>

                                            <div className="w-full flex items-center gap-2">
                                                <span className="text-xs text-white">{formatTime(currentTime)}</span>
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={duration}
                                                    value={currentTime}
                                                    onChange={handleSeek}
                                                    className="w-full"
                                                />
                                                <span className="text-xs text-white">{formatTime(duration)}</span>
                                            </div>
                                        </div>

                                        <audio
                                            ref={audioRef}
                                            onTimeUpdate={handleTimeUpdate}
                                            onLoadedMetadata={handleLoadedMetadata}
                                            onEnded={() => setIsPlaying(false)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Modal
                            isOpen={isAlbumOpen}
                            onOpenChange={onAlbumClose}
                            placement="center"
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <form onSubmit={handleAlbumSubmit(onAlbumSubmit)}>
                                        <ModalHeader>Criar Novo Álbum</ModalHeader>
                                        <ModalBody>
                                            <div className="space-y-4">
                                                <div className="flex justify-center">
                                                    <label className="cursor-pointer">
                                                        <div className="w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center">
                                                            {previewUrl ? (
                                                                <img
                                                                    src={previewUrl}
                                                                    alt="Preview"
                                                                    className="w-full h-full object-cover rounded-lg"
                                                                />
                                                            ) : (
                                                                <span>Selecionar Capa</span>
                                                            )}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                        />
                                                    </label>
                                                </div>
                                                <Input
                                                    {...registerAlbum("title")}
                                                    label="Título do Álbum"
                                                    variant="bordered"
                                                    errorMessage={albumErrors.title?.message}
                                                    isInvalid={!!albumErrors.title}
                                                />
                                                <Input
                                                    {...registerAlbum("artist")}
                                                    label="Artista"
                                                    variant="bordered"
                                                    errorMessage={albumErrors.artist?.message}
                                                    isInvalid={!!albumErrors.artist}
                                                />
                                                <Input
                                                    {...registerAlbum("releaseYear")}
                                                    label="Data de Publicação"
                                                    type="date"
                                                    variant="bordered"
                                                    errorMessage={albumErrors.releaseYear?.message}
                                                    isInvalid={!!albumErrors.releaseYear}
                                                />
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cancelar
                                            </Button>
                                            <Button color="primary" type="submit" isLoading={loading}>
                                                Criar Álbum
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                )}
                            </ModalContent>
                        </Modal>

                        <Modal
                            isOpen={isViewAlbumOpen}
                            onClose={onViewAlbumClose}
                            placement="center"
                            size="2xl"
                        >
                            <ModalContent>
                                {selectedAlbum && (
                                    <>
                                        <ModalHeader className="flex gap-3">
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedAlbum.title}</h2>
                                                <p className="text-sm text-gray-500">{selectedAlbum.artist}</p>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="space-y-6">
                                                <div className="flex gap-6">
                                                    <div className="w-48">
                                                        {selectedAlbum.coverImage ? (
                                                            <Image
                                                                src={selectedAlbum.coverImage}
                                                                alt={selectedAlbum.title}
                                                                width={200}
                                                                height={200}
                                                                className="rounded-lg shadow-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-[200px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
                                                                <FaMusic size={40} className="text-gray-400" />
                                                            </div>
                                                        )}
                                                        <div className="mt-4">
                                                            <p className="text-sm text-gray-500">Ano de Lançamento</p>
                                                            <p className="text-lg">{selectedAlbum.releaseYear}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-semibold mb-4">Músicas</h3>
                                                        {albumMusics.length > 0 ? (
                                                            <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                                                {musics.map((music) => (
                                                                    <Card
                                                                        key={music.id}
                                                                        className="h-28"
                                                                    >
                                                                        <CardBody className="flex flex-col justify-between p-6">
                                                                            <div className="flex items-center justify-between">
                                                                                <div>
                                                                                    <h3 className="mb-2 text-xl font-semibold">{music.title}</h3>
                                                                                    <p className="text-sm text-gray-500">
                                                                                        {albums.find(album => album.id === music.albumId)?.title || "Álbum não encontrado"}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="mt-4 flex items-center gap-2">
                                                                                    <Button
                                                                                        isIconOnly
                                                                                        color="primary"
                                                                                        variant="light"
                                                                                        onClick={() => handlePlayMusic(music)}
                                                                                    >
                                                                                        <FaPlay />
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                ))}

                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-500">Nenhuma música adicionada ainda.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onViewAlbumClose}>
                                                Fechar
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </Tab>

                    <Tab key="musicas" title="Minhas Músicas">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card
                                isPressable
                                className="group h-52 cursor-pointer transition-all hover:scale-102"
                                onPress={onMusicOpen}
                            >
                                <CardBody className="flex items-center justify-center text-center">
                                    <div>
                                        <FaPlus size={28} className="mx-auto mb-3 text-gray-500 group-hover:text-primary" />
                                        <p className="text-lg font-medium">Adicionar Nova Música</p>
                                    </div>
                                </CardBody>
                            </Card>

                            {musics.map((music) => (
                                <Card
                                    key={music.id}
                                    className="h-52"
                                >
                                    <CardBody className="flex flex-col justify-between p-6">
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold">{music.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {albums.find(album => album.id === music.albumId)?.title || "Álbum não encontrado"}
                                            </p>
                                            <div className="mt-4">
                                                <FaMusic className="text-gray-400" size={24} />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>

                        <Modal
                            isOpen={isMusicOpen}
                            onOpenChange={onMusicClose}
                            placement="center"
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <form onSubmit={handleMusicSubmit(onMusicSubmit)}>
                                        <ModalHeader>Adicionar Nova Música</ModalHeader>
                                        <ModalBody>
                                            <div className="space-y-4">
                                                <Input
                                                    {...registerMusic("title")}
                                                    label="Nome da Música"
                                                    variant="bordered"
                                                    errorMessage={musicErrors.title?.message}
                                                    isInvalid={!!musicErrors.title}
                                                />

                                                <Input
                                                    {...registerMusic("artist")}
                                                    label="Artista"
                                                    variant="bordered"
                                                    errorMessage={musicErrors.artist?.message}
                                                    isInvalid={!!musicErrors.artist}
                                                />

                                                <Select
                                                    {...registerMusic("albumId")}
                                                    label="Álbum"
                                                    variant="bordered"
                                                    errorMessage={musicErrors.albumId?.message}
                                                    isInvalid={!!musicErrors.albumId}
                                                >
                                                    {albums.map((album) => (
                                                        <SelectItem key={album.id} value={album.id}>
                                                            {album.title}
                                                        </SelectItem>
                                                    ))}
                                                </Select>

                                                <div className="mt-4">
                                                    <InputFile
                                                        onUploadComplete={handleMusicUploadComplete}
                                                        onUploadError={handleMusicUploadError}
                                                    />
                                                    {uploadError && (
                                                        <p className="text-red-500 text-sm mt-2">{uploadError}</p>
                                                    )}
                                                    {musicUrl && (
                                                        <div className="mt-2">
                                                            <audio controls src={musicUrl} className="w-full" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Cancelar
                                            </Button>
                                            <Button color="primary" type="submit" isLoading={loading}>
                                                Adicionar Música
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                )}
                            </ModalContent>
                        </Modal>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
