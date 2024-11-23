"use client";

import { Card, Input, Textarea, Button } from "@nextui-org/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contato() {
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
            Entre em Contato
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            Estamos aqui para ajudar! Envie sua mensagem e retornaremos em breve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="p-8 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-500/10 backdrop-blur-sm" data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Informações de Contato
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-300">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">contato@playersamuca.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Endereço</h3>
                  <p className="text-gray-600 dark:text-gray-300">Av. Paulista, 1000 - São Paulo, SP</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-blue-600/10 backdrop-blur-sm" data-aos="fade-left">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Nome"
                  placeholder="Digite seu nome"
                  variant="bordered"
                />
                <Input
                  type="email"
                  label="Email"
                  placeholder="Digite seu email"
                  variant="bordered"
                />
              </div>
              
              <Input
                type="text"
                label="Assunto"
                placeholder="Digite o assunto"
                variant="bordered"
              />
              
              <Textarea
                label="Mensagem"
                placeholder="Digite sua mensagem"
                variant="bordered"
                minRows={4}
              />
              
              <Button
                color="secondary"
                variant="shadow"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 font-semibold"
              >
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
