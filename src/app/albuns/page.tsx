"use client";

import { Card, Image, Button } from "@nextui-org/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Albuns() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const albuns = [
    {
      id: 1,
      titulo: "Melodias do Amanhecer",
      artista: "Aurora Celestial", 
      capa: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      genero: "Ambient",
      ano: "2023"
    },
    {
      id: 2,
      titulo: "Batidas Urbanas",
      artista: "Ritmo das Ruas",
      capa: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
      genero: "Hip Hop",
      ano: "2023"
    },
    {
      id: 3,
      titulo: "Ondas Sonoras",
      artista: "Mar Musical",
      capa: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
      genero: "Eletrônico", 
      ano: "2023"
    },
    {
      id: 4,
      titulo: "Acústico Noturno",
      artista: "Violões da Noite",
      capa: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      genero: "Acústico",
      ano: "2023"
    },
    {
      id: 5,
      titulo: "Sinfonia das Estrelas",
      artista: "Orquestra Cósmica",
      capa: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6",
      genero: "Clássico",
      ano: "2023"
    },
    {
      id: 6,
      titulo: "Raízes do Som",
      artista: "Terra Sonora",
      capa: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      genero: "World Music",
      ano: "2023"
    }
  ];

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
        {albuns.map((album) => (
          <Card 
            key={album.id}
            className="group hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-500/10 backdrop-blur-sm border border-white/10"
            data-aos="fade-up"
          >
            <div className="relative h-[450px]">
              <Image
                src={album.capa}
                alt={album.titulo}
                radius="none"
                classNames={{
                  img: "object-cover w-screen h-[200px] brightness-90 group-hover:brightness-100 transition-all duration-300"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-lg">
                <div className="absolute -bottom-0 left-0 right-0 p-8 space-y-4">
                  <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">{album.titulo}</h3>
                  <p className="text-lg text-gray-200">{album.artista}</p>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 backdrop-blur-md rounded-full text-sm font-medium text-white">
                      {album.genero}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 backdrop-blur-md rounded-full text-sm font-medium text-white">
                      {album.ano}
                    </span>
                  </div>
                  <Button
                    color="secondary"
                    variant="shadow"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 font-semibold text-lg py-6"
                  >
                    Ouvir Agora
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

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
