"use client";

import { Card, Image, Button, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "@/services/firebaseConnection";
import { collection, query, onSnapshot } from "firebase/firestore";

export default function Albuns() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const albumsPerPage = 9;

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

  const handleAlbumClick = (album: any) => {
    setSelectedAlbum(album);
    onOpen();
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
      <div className="relative mb-16" data-aos="fade-up">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 blur-3xl -z-10" />
        <h1 className="text-7xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Álbuns em Destaque
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
          Explore nossa seleção cuidadosamente curada de álbuns excepcionais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          // Skeletons enquanto carrega
          [...Array(6)].map((_, index) => (
            <Card key={index} className="h-[500px]" data-aos="fade-up">
              <Skeleton className="h-[200px] rounded-none" />
              <div className="p-8 space-y-4">
                <Skeleton className="h-8 w-3/4 rounded-lg" />
                <Skeleton className="h-6 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-1/3 rounded-lg" />
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-24 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-full" />
                </div>
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </Card>
          ))
        ) : (
          currentAlbums.map((album) => (
            <Card 
              key={album.id}
              className="group hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-500/10 backdrop-blur-sm border border-white/10"
              data-aos="fade-up"
            >
              <div className="relative h-[500px]">
                <Image
                  src={album.coverImage || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"}
                  alt={album.title}
                  radius="none"
                  classNames={{
                    img: "object-cover w-screen h-[200px] brightness-90 group-hover:brightness-100 transition-all duration-300"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-lg">
                  <div className="absolute -bottom-0 left-0 right-0 p-8 space-y-4">
                    <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">{album.title}</h3>
                    <p className="text-lg text-gray-200">{album.artist}</p>
                    <p className="text-sm text-gray-400">Postado por: {album.userEmail}</p>
                    <div className="flex gap-3">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 backdrop-blur-md rounded-full text-sm font-medium text-white">
                        {album.genre || "Música"}
                      </span>
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 backdrop-blur-md rounded-full text-sm font-medium text-white">
                        {album.releaseYear}
                      </span>
                    </div>
                    <Button
                      color="secondary"
                      variant="shadow"
                      className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 font-semibold text-lg py-6"
                      onClick={() => handleAlbumClick(album)}
                    >
                      Ver Informações
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Paginação */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            color="secondary"
            variant="flat"
            isDisabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Anterior
          </Button>
          
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              color={currentPage === index + 1 ? "secondary" : "default"}
              variant={currentPage === index + 1 ? "solid" : "flat"}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            color="secondary"
            variant="flat"
            isDisabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Próxima
          </Button>
        </div>
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

      <Card className="mt-16 p-12 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-500/10 backdrop-blur-sm text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Descubra Mais Música
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Milhares de álbuns são adicionados à nossa coleção todos os dias. 
          Não perca nenhum lançamento!
        </p>
        <Button
          size="lg"
          color="secondary"
          variant="shadow"
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"
        >
          Ver Todos os Álbuns
        </Button>
      </Card>
    </div>
  );
}
