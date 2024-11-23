"use client";

import { Card, Image } from "@nextui-org/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Sobre() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="max-w-6xl mx-auto" data-aos="fade-up">
        <div className="relative mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 blur-3xl -z-10" />
          <h1 className="text-7xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Nossa História
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            Transformando o jeito que você escuta e vive a música desde 2023
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <div className="space-y-8" data-aos="fade-right">
            <Card className="p-8 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-500/10 backdrop-blur-sm border border-white/10">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Como Começamos
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Nascemos de um sonho ambicioso: criar a melhor experiência musical do Brasil. 
                O que começou como um projeto apaixonado em um pequeno escritório, hoje se 
                tornou uma das plataformas mais inovadoras do país.
              </p>
            </Card>

            <div className="relative h-80 rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
                alt="Estúdio de música"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-8" data-aos="fade-left">
            <div className="relative h-80 rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae"
                alt="Pessoas ouvindo música"
                className="object-cover w-full h-full"
              />
            </div>

            <Card className="p-8 bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-blue-600/10 backdrop-blur-sm border border-white/10">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Nossa Missão
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Acreditamos que a música é uma força transformadora. Nossa missão é 
                conectar artistas e fãs através de uma plataforma que celebra a 
                diversidade musical brasileira.
              </p>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card className="p-8 bg-gradient-to-br from-blue-600/5 to-purple-600/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">+1M</h3>
            <p className="text-gray-600 dark:text-gray-300">Playlists Criadas</p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-purple-600/5 to-pink-500/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">100K+</h3>
            <p className="text-gray-600 dark:text-gray-300">Artistas Apoiados</p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-pink-500/5 to-orange-500/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300" data-aos="fade-up" data-aos-delay="300">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Brasil</h3>
            <p className="text-gray-600 dark:text-gray-300">Presença Nacional</p>
          </Card>
        </div>

        <Card className="p-12 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-500/10 backdrop-blur-sm text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Faça Parte Dessa História
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Junte-se a nós nessa jornada de transformar a experiência musical no Brasil. 
            Sua música, sua vibe, seu momento - tudo em um só lugar.
          </p>
        </Card>
      </section>
    </div>
  );
}
