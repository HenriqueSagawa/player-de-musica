"use client";

import { Link } from "@nextui-org/react";

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 mt-16 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-500/5">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Player de Música do Samuca
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Sua plataforma de música favorita
            </p>
          </div>

          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-500">
              Termos
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-500">
              Privacidade
            </Link>
            <Link href="#" className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-500">
              Contato
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            © 2024 Player de Música do Samuca. Desenvolvido por <Link href="https://github.com/HenriqueSagawa" className="text-purple-500 hover:text-purple-600">Henrique Sagawa</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
