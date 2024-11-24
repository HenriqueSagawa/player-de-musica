"use client";

import { Card, Image, Button, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, CardBody } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "@/services/firebaseConnection";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

export default function Albuns() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [albumMusics, setAlbumMusics] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 9;
  const [currentMusicIndex, setCurrentMusicIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const albunsRef = collection(db, "albums");
    const q = query(albunsRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setAlbums(lista);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAlbumClick = async (album: any) => {
    setSelectedAlbum(album);
    setCurrentMusicIndex(-1);
    setIsPlaying(false);
    
    const musicsRef = collection(db, "musics");
    const q = query(musicsRef, where("albumId", "==", album.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const musics = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlbumMusics(musics);
    });

    onOpen();
  };

  const handlePlayPause = (index: number) => {
    if (currentMusicIndex === index) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentMusicIndex(index);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = albumMusics[index].musicUrl; // Alterado de url para musicUrl
        audioRef.current.play()
          .catch(error => {
            console.error("Erro ao tocar música:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handlePrevious = () => {
    if (currentMusicIndex > 0) {
      setCurrentMusicIndex(currentMusicIndex - 1);
      if (audioRef.current) {
        audioRef.current.src = albumMusics[currentMusicIndex - 1].musicUrl; // Alterado de url para musicUrl
        audioRef.current.play()
          .catch(error => {
            console.error("Erro ao tocar música anterior:", error);
            setIsPlaying(false);
          });
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (currentMusicIndex < albumMusics.length - 1) {
      setCurrentMusicIndex(currentMusicIndex + 1);
      if (audioRef.current) {
        audioRef.current.src = albumMusics[currentMusicIndex + 1].musicUrl; // Alterado de url para musicUrl
        audioRef.current.play()
          .catch(error => {
            console.error("Erro ao tocar próxima música:", error);
            setIsPlaying(false);
          });
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
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

  // Cálculo para paginação
  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const totalPages = Math.ceil(albums.length / albumsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
        Álbuns Disponíveis
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[400px] rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAlbums.map((album) => (
              <Card 
                key={album.id}
                isPressable
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => handleAlbumClick(album)}
                data-aos="fade-up"
              >
                <Image
                  removeWrapper
                  alt={album.title}
                  className="w-full h-[300px] object-cover"
                  src={album.coverImage || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"}
                />
                <CardBody className="p-4">
                  <h2 className="text-xl font-bold">{album.title}</h2>
                  <p className="text-gray-500">{album.artist}</p>
                  <p className="text-sm text-gray-400">{album.releaseYear}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  color={currentPage === index + 1 ? "primary" : "default"}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {selectedAlbum?.title}
                </h2>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Image
                    src={selectedAlbum?.coverImage || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"}
                    alt={selectedAlbum?.title}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-400">Artista</h3>
                      <p className="text-xl">{selectedAlbum?.artist}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-400">Ano de Lançamento</h3>
                      <p className="text-xl">{selectedAlbum?.releaseYear}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-400">Gênero</h3>
                      <p className="text-xl">{selectedAlbum?.genre || "Não especificado"}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-400">Postado por</h3>
                      <p className="text-xl">{selectedAlbum?.userEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Músicas do Álbum</h3>
                  {albumMusics.length > 0 ? (
                    <div className="space-y-4">
                      <audio 
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => handleNext()}
                        className="hidden"
                      />
                      {albumMusics.map((music, index) => (
                        <div 
                          key={music.id} 
                          className={`flex items-center gap-4 p-4 rounded-lg ${
                            currentMusicIndex === index 
                              ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <Button
                            isIconOnly
                            className="min-w-[40px]"
                            onClick={() => handlePlayPause(index)}
                          >
                            {currentMusicIndex === index && isPlaying ? (
                              <FaPause className="text-gray-600" />
                            ) : (
                              <FaPlay className="text-gray-600" />
                            )}
                          </Button>
                          <div className="flex-grow">
                            <h4 className="font-semibold">{music.title}</h4>
                            <p className="text-sm text-gray-500">{music.artist}</p>
                          </div>
                          {currentMusicIndex === index && (
                            <div className="flex items-center gap-4 flex-grow">
                              <Button
                                isIconOnly
                                onClick={handlePrevious}
                                isDisabled={currentMusicIndex === 0}
                              >
                                <FaStepBackward />
                              </Button>
                              <div className="flex-grow flex items-center gap-2">
                                <span className="text-sm">{formatTime(currentTime)}</span>
                                <input
                                  type="range"
                                  min={0}
                                  max={duration || 0}
                                  value={currentTime}
                                  onChange={handleSeek}
                                  className="w-full"
                                />
                                <span className="text-sm">{formatTime(duration)}</span>
                              </div>
                              <Button
                                isIconOnly
                                onClick={handleNext}
                                isDisabled={currentMusicIndex === albumMusics.length - 1}
                              >
                                <FaStepForward />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhuma música adicionada a este álbum ainda.</p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
