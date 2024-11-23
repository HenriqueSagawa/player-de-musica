"use client";

import { Avatar, Button, Card } from "@nextui-org/react";
import { useEffect } from "react";
import AOS from "aos";
import Image from "next/image";
import heroImg from "@/../public/assets/img/headerImg.jpg";

import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container mx-auto px-4">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-80px)] py-16 relative" data-aos="fade-up">
        <div className="absolute inset-20 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-500/20 blur-3xl -z-10" />
        <div className="flex-1 space-y-8 max-w-2xl">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
            Sua música, sua vibe, seu momento
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Descubra milhões de músicas, crie suas playlists personalizadas e compartilhe seus momentos musicais favoritos.
          </p>
          <div className="flex gap-6">
            <Button
              color="secondary"
              variant="shadow"
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 font-semibold"
            >
              Começar agora
            </Button>
            <Button 
              variant="bordered"
              color="secondary"
              size="lg"
              className="font-semibold"
            >
              Saiba mais
            </Button>
          </div>
        </div>
        
        <div className="flex-1 relative w-full max-w-xl" data-aos="fade-left">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image 
              src={heroImg} 
              alt="Hero" 
              fill
              className="object-cover brightness-75"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-pink-500/10 blur-2xl -z-10" />
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent" data-aos="fade-up">
          Recursos Incríveis para sua Experiência Musical
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-500/5 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Biblioteca Ilimitada</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Acesse milhões de músicas de diferentes gêneros e artistas do mundo todo.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-500/5 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="200">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Playlists Personalizadas</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Crie e compartilhe playlists únicas baseadas em seus gostos musicais.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="300">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Alta Qualidade</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Desfrute de streaming em alta definição com qualidade de áudio excepcional.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-500/5 rounded-3xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-pink-500/10 blur-3xl -z-10" />
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4" data-aos="fade-up">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Estatísticas Impressionantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="100">
              <p className="text-4xl font-bold text-blue-600">+10M</p>
              <p className="text-gray-600 dark:text-gray-300">Músicas Disponíveis</p>
            </div>
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="200">
              <p className="text-4xl font-bold text-purple-600">+500K</p>
              <p className="text-gray-600 dark:text-gray-300">Usuários Ativos</p>
            </div>
            <div className="space-y-2" data-aos="fade-up" data-aos-delay="300">
              <p className="text-4xl font-bold text-pink-500">+1M</p>
              <p className="text-gray-600 dark:text-gray-300">Playlists Criadas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-500/10 blur-2xl -z-10" />
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent" data-aos="fade-up">
            Depoimentos dos Usuários
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 backdrop-blur-sm" data-aos="fade-right">
              <p className="text-gray-600 dark:text-gray-300 italic">"A melhor plataforma de música que já usei. Interface incrível e som de qualidade!"</p>
              <div className="mt-4 flex items-center gap-4">
                <Avatar
                  className="w-12 h-12"
                  src="https://i.pravatar.cc/150?u=maria"
                  name="Maria Silva"
                />
                <div>
                  <p className="font-semibold">Maria Silva</p>
                  <p className="text-sm text-gray-500">Usuária Premium</p>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-500/5 backdrop-blur-sm" data-aos="fade-left">
              <p className="text-gray-600 dark:text-gray-300 italic">"As playlists personalizadas são simplesmente perfeitas! Sempre descobrindo novas músicas."</p>
              <div className="mt-4 flex items-center gap-4">
                <Avatar
                  className="w-12 h-12"
                  src="https://i.pravatar.cc/150?u=joao" 
                  name="João Santos"
                />
                <div>
                  <p className="font-semibold">João Santos</p>
                  <p className="text-sm text-gray-500">Usuário Premium</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-pink-500/10 blur-2xl -z-10" />
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent" data-aos="fade-up">
            Nossa Equipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 text-center bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="100">
              <Avatar
                className="w-32 h-32 mx-auto mb-4"
                src="https://i.pravatar.cc/150?u=samuel"
                name="Samuel Lopes"
              />
              <h3 className="text-xl font-semibold">Samuel Σαμουήλ</h3>
              <p className="text-gray-600 dark:text-gray-300">CEO</p>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Responsável pela ideia e desenvolvimento do projeto.
              </p>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-purple-600/5 via-transparent to-pink-500/5 backdrop-blur-sm" data-aos="fade-up" data-aos-delay="300">
              <Avatar
                className="w-32 h-32 mx-auto mb-4"
                src="https://i.pravatar.cc/150?u=pedro"
                name="Pedro Santos"
              />
              <h3 className="text-xl font-semibold">Henrique Sagawa</h3>
              <p className="text-gray-600 dark:text-gray-300">Desenvolvedor</p>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Responsável pela parte de produto e desenvolvimento.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-500/20 blur-3xl -z-10" />
        <div className="max-w-3xl mx-auto px-4 space-y-8" data-aos="fade-up">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Comece a Sua Jornada Musical Hoje
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Junte-se a milhares de usuários e descubra um novo mundo de possibilidades musicais.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-semibold"
          >
            Criar Conta Gratuita
          </Button>
        </div>
      </section>
    </div>
  );
}
