# 🎵 Player de Música do Samuca

Este repositório contém o projeto de um **Player de Música**, desenvolvido como atividade prática para a disciplina de **Programação Web Orientada a Objetos** do curso **Técnico em Informática para Internet Integrado ao Ensino Médio**, oferecido pelo **Instituto Federal do Paraná (IFPR) - Campus Assis Chateaubriand**.

---

## 📝 Informações do Projeto

- **Aluno**: Henrique Tutomu Sagawa  
- **Orientador**: Samuel Stephan Milczuk  
- **Objetivo**: Desenvolver uma aplicação web para reprodução de músicas, com foco em boas práticas de programação orientada a objetos, integração com serviços externos (Firebase e NextAuth.js) e interface moderna utilizando frameworks CSS.

---

## 💻 Tecnologias e Ferramentas Utilizadas

1. **[Next.js](https://nextjs.org/)**: Framework React para desenvolvimento de aplicações web server-side e client-side.
2. **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript para adicionar tipagem estática e evitar erros em tempo de execução.
3. **[Firebase](https://firebase.google.com/)**: Serviço backend para banco de dados em tempo real e armazenamento.
4. **[NextAuth.js](https://next-auth.js.org/)**: Biblioteca de autenticação para Next.js.
5. **[Next UI](https://nextui.org/)**: Biblioteca de componentes para construir interfaces modernas e responsivas.
6. **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilitários CSS para estilização rápida e eficiente.
7. **[PostCSS](https://postcss.org/)**: Ferramenta para processamento de CSS com plugins.
8. **[Node.js](https://nodejs.org/)**: Plataforma para execução do JavaScript no backend.

---

## 📂 Estrutura do Projeto

O projeto segue uma organização modular e escalável, com separação de responsabilidades. A estrutura de pastas está configurada da seguinte forma:

```
src/
├── app/                    # Páginas principais do projeto
│   ├── albuns/             # Página para gerenciamento de álbuns
│   ├── api/                # Endpoints de API
│   │   └── auth/           # Endpoints do NextAuth.js para autenticação
│   ├── contato/            # Página de contato
│   ├── dashboard/          # Painel de controle
│   ├── sobre/              # Página "Sobre" do player
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   └── providers.tsx       # Configuração de provedores (ex.: autenticação)
├── components/             # Componentes reutilizáveis
├── lib/                    # Código auxiliar e funções utilitárias
├── services/               # Serviços para integração com Firebase e outros
│   ├── albumService.ts     # Gerenciamento de álbuns
│   ├── firebaseConnection.ts  # Configuração e conexão com o Firebase
│   ├── musicService.ts     # Serviço para manipulação de músicas
│   └── setFirebaseData.ts  # Configuração de dados no Firebase
├── types/                  # Tipagens TypeScript do projeto
public/                     # Arquivos públicos, como imagens e ícones
.env                        # Variáveis de ambiente para configuração do Firebase e NextAuth
```

---

## 🎨 Funcionalidades do Projeto

1. **Player de Música**: Permite reproduzir, pausar e navegar entre músicas carregadas.
2. **Gerenciamento de Álbuns**:  
   - Criar novos álbuns com nome, descrição e imagens.  
   - Listar álbuns disponíveis no sistema.  
   - Ver álbuns de outros usuários.
   - Ouvir as músicas cadastradas.
3. **Autenticação com NextAuth.js**:  
   - Login utilizando contas do Google, Github ou e-mail/senha.
   - Gerenciamento de sessões de usuário.
   - Controle de acesso a páginas e funcionalidades baseadas na autenticação.  
4. **Banco de Dados em Tempo Real**: Utilização do Firestore para armazenar informações de músicas, álbuns e usuários.
5. **Interface Responsiva**: Totalmente adaptada para diferentes tamanhos de tela, utilizando o Tailwind CSS.
6. **Organização Modular**: Arquitetura de código limpa e organizada, facilitando a manutenção e escalabilidade.

---

## 🛠️ Pré-requisitos para Rodar o Projeto

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta no [Firebase](https://firebase.google.com/) para configurar o backend do projeto.
- Credenciais OAuth 2.0 configuradas em [Google Cloud Console](https://console.cloud.google.com/) para NextAuth.js.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório

Faça o clone do repositório em sua máquina local:

```bash
git clone https://github.com/seu-usuario/music-player.git
cd music-player
```

### 2. Instalar Dependências

Instale as dependências do projeto com o seguinte comando:

```bash
npm install
# ou
yarn install
```

### 3. Configurar as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as credenciais do Firebase e NextAuth.js:

```env
# Firebase
NEXTAUTH_URL="Sua url aqui"
NEXTAUTH_SECRET="Sua chave aqui"

GOOGLE_CLIENT_ID="Sua chave aqui"
GOOGLE_CLIENT_SECRET="Sua chave aqui"

GITHUB_CLIENT_ID="Sua chave aqui"
GITHUB_SECRET="Sua chave aqui"

EDGE_STORE_ACCESS_KEY="Sua chave aqui"
EDGE_STORE_SECRET_KEY="Sua chave aqui"
EDGE_STORE_PROCESS_ENV=true
```

### 4. Configurar Credenciais OAuth 2.0 no Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto ou selecione um existente.
3. Vá para **APIs e Serviços > Credenciais**.
4. Crie um ID do cliente OAuth 2.0 e configure o URI de redirecionamento para `http://localhost:3000/api/auth/callback/google`.
5. Copie o `Client ID` e `Client Secret` e insira no arquivo `.env`.

### 5. Executar o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto será executado no endereço [http://localhost:3000](http://localhost:3000).

---

## 📚 Aprendizados e Boas Práticas Aplicadas

- **Programação Orientada a Objetos (POO)**: Criação de serviços e componentes reutilizáveis com foco na modularidade.
- **Uso de Tipagem**: Adoção do TypeScript para aumentar a confiabilidade do código.
- **Integração com Firebase**: Utilização de banco de dados em tempo real para sincronização de dados.
- **Autenticação com NextAuth.js**: Implementação de controle de acesso e segurança em páginas protegidas.
- **Design Responsivo**: Construção de uma interface adaptada para diferentes dispositivos.
- **Componentização**: Desenvolvimento de uma estrutura escalável utilizando Next.js.

---

## 🛡️ Licença

Este projeto foi desenvolvido como parte de uma atividade acadêmica e não possui uma licença oficial de distribuição. Caso deseje reutilizar este código, entre em contato com o autor.

---

## 📧 Contato

Caso tenha dúvidas, sugestões ou queira saber mais sobre o projeto:

- **Aluno**: Henrique Tutomu Sagawa  
  - Email: henriquetutomusagawa@gmail.com
- **Orientador**: Samuel Stephan Milczuk  
  - Email: samuel.milczuk@ifpr.edu.br
- **Instituição**: Instituto Federal do Paraná - Campus Assis Chateaubriand  
