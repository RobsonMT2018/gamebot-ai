
<div align="center">

# 🎮 GameBot AI

### 🤖 Assistente Inteligente para Desenvolvimento de Jogos Digitais

<p>
  <strong>Crie. Explore. Desenvolva. Jogue.</strong>
</p>

<p>
  Um assistente de inteligência artificial para ajudar
  desenvolvedores a criar experiências incríveis no mundo dos games.
</p>

<br>

<img src="https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/AI-Powered-8A2BE2?style=for-the-badge" alt="AI">
<img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" alt="Status">

</div>

## 🏗️ Visão Geral do Projeto

<p align="center">
  <img src="./project-architecture.svg" alt="Estrutura do projeto GameBot AI" width="1000" />
</p>

O GameBot AI é uma aplicação web de assistente inteligente para criação de ideias, mecânicas, personagens e conceitos de jogos. O projeto combina uma interface moderna em React com um backend em Express e integração com a OpenAI para gerar respostas criativas em português.

### Fluxo principal do sistema

<p align="center">
  <img src="./project-flow.svg" alt="Fluxo principal do GameBot AI" width="1100" />
</p>

### Fase 2 implementada

<p align="center">
  <img src="./project-phase2.svg" alt="Fase 2 do GameBot AI" width="1100" />
</p>

Nesta etapa, o chat evoluiu para um ambiente mais produtivo, com painel de projetos, ações rápidas, melhor contexto visual, geração de ideias e respostas mais estruturadas para personagens, missões e fases.

---

## 🧠 Sobre o Projeto

O **GameBot AI** é um projeto de assistente inteligente
desenvolvido para auxiliar na criação de jogos digitais.

A proposta é unir inteligência artificial, programação
e desenvolvimento de games em uma plataforma moderna,
interativa e intuitiva.

O GameBot poderá ajudar desenvolvedores a criar ideias,
personagens, missões, mecânicas e códigos para jogos.

---

## 🎯 Objetivo

Desenvolver uma plataforma inteligente que facilite
o processo de criação de jogos digitais, oferecendo
recursos para desenvolvedores iniciantes e experientes.

### Principais objetivos

- Criar ideias originais para jogos.
- Gerar personagens e histórias.
- Criar missões e desafios.
- Auxiliar na programação de jogos.
- Integrar ferramentas de desenvolvimento.
- Criar uma experiência gamer moderna.

---

## ✨ Funcionalidades

### 🤖 Assistente de IA

- Chat inteligente.
- Respostas em português.
- Sugestões de desenvolvimento.
- Auxílio na programação.

### 🎮 Game Studio

- Gerador de ideias de jogos.
- Gerador de personagens.
- Gerador de missões.
- Gerador de inimigos.
- Criação de conceitos de fases.

### 💻 Desenvolvimento

- Suporte a JavaScript.
- Suporte a React.
- Suporte a Phaser.
- Suporte a Three.js.
- Suporte a C# e Unity.

### 🎨 Interface

- Design gamer futurista.
- Tema dark.
- Azul neon.
- Layout responsivo.
- Chat interativo.

---

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|------------|------------|
| React.js | Interface do usuário |
| JavaScript | Lógica da aplicação |
| CSS3 | Estilização |
| Node.js | Backend |
| Express | API REST |
| OpenAI API | Inteligência artificial |
| Phaser | Desenvolvimento de jogos 2D |
| Three.js | Desenvolvimento 3D |
| Git | Controle de versão |
| GitHub | Hospedagem do código |

---

## 📁 Estrutura do Projeto

```text
gamebot-ai/
├── README.md
├── .gitignore
├── project-architecture.svg
├── project-flow.svg
├── project-phase2.svg
├── gamebot-ai/
│   ├── package.json
│   ├── client/
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   ├── public/
│   │   └── src/
│   │       ├── App.jsx
│   │       ├── App.css
│   │       ├── main.jsx
│   │       ├── index.css
│   │       └── assets/
│   └── server/
│       ├── package.json
│       ├── .env
│       ├── .env.example
│       ├── tests/
│       │   └── gamebotService.test.js
│       └── src/
│           ├── server.js
│           ├── routes/
│           │   └── chatRoutes.js
│           ├── controllers/
│           │   └── chatController.js
│           └── services/
│               └── gamebotService.js
```

### Explicação da estrutura

- client/: interface do usuário em React + Vite
- src/App.jsx: tela principal do chat e envio de mensagens
- src/App.css: estilos visuais da aplicação
- server/: backend em Node.js + Express
- src/server.js: inicialização da API
- routes/chatRoutes.js: definição da rota /api/chat
- controllers/chatController.js: validação da entrada do usuário
- services/gamebotService.js: lógica de integração com a OpenAI
- .env: variáveis de ambiente do backend

---

## ⚙️ Como o projeto funciona

### 1. Usuário digita uma ideia
O usuário envia uma mensagem na interface, como:
- "Crie um jogo de plataforma com temática cyberpunk"
- "Quero uma ideia de RPG 2D"

### 2. Frontend envia para a API
O React envia a mensagem para o endpoint:

```text
POST /api/chat
```

### 3. Backend valida e processa
O Express recebe a requisição, chama o controller e envia o texto para o serviço.

### 4. IA gera a resposta
O serviço verifica se há uma chave da OpenAI configurada e, então, chama a API da OpenAI para gerar uma resposta criativa em português.

### 5. Resposta volta para o usuário
A resposta da IA é retornada ao frontend e exibida no chat.

---

## 🎮 Principais funcionalidades

- Chat interativo para ideias de jogos
- Sugestões de personagens e mecânicas
- Criação de conceitos de fases e desafios
- Respostas em português
- Estrutura modular para evolução do projeto
- Backend pronto para integração com IA
- Painel lateral de projetos
- Ações rápidas de criação de ideias
- Melhor UX e contexto do projeto em andamento
- Geração de resposta orientada a personagens, missões e fases

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/RobsonMT2018/gamebot-ai.git
cd gamebot-ai
```

### 2. Instale as dependências do projeto principal

```bash
cd gamebot-ai
npm install
```

### 3. Instale as dependências do frontend e do backend

```bash
npm --prefix client install
npm --prefix server install
```

### 4. Configure a chave da OpenAI

Dentro da pasta do backend, copie o arquivo de exemplo e edite o valor:

```bash
cp gamebot-ai/server/.env.example gamebot-ai/server/.env
```

Depois abra o arquivo e substitua o valor:

```env
PORT=5000
OPENAI_API_KEY=sua_chave_da_openai_aqui
```

> O projeto já está pronto para usar a chave real da OpenAI. Quando a variável estiver configurada, o backend chama a API do OpenAI. Se a chave não existir, o sistema usa um fallback local para não quebrar a aplicação.

### 5. Rode o projeto completo

Na raiz do projeto:

```bash
npm run dev
```

Isso inicia o frontend e o backend em paralelo.

### 6. Acesse a aplicação

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health

### 7. Teste o chat

Abra a interface do frontend e envie uma mensagem como:

```text
Crie um jogo de plataforma em pixel art com tema cyberpunk
```

Se a chave estiver correta, a IA responderá com geração real. Caso contrário, o sistema entra em modo fallback para continuar funcionando.

### 8. Rodar apenas backend ou frontend

```bash
npm run server
```

```bash
npm run client
```

---

## 🔐 Segurança da chave da OpenAI

- Nunca compartilhe a chave pública em repositórios
- Mantenha o arquivo `.env` local e protegido
- O arquivo `.env` já está ignorado pelo Git via `.gitignore`
- O arquivo `.env.example` serve como modelo para gerar sua própria chave

---

## 🧪 Validação atual

O projeto já conta com:
- frontend funcionando em React + Vite
- backend em Express
- rota de chat em /api/chat
- integração com OpenAI
- fallback para respostas locais quando a chave não está disponível
- testes básicos do serviço de IA

---

## 🗺️ Roadmap

### Fase 1 — MVP
- [x] Estrutura inicial do projeto
- [x] Frontend do chat
- [x] Backend da API
- [x] Integração com IA
- [x] Documentação inicial do README

### Fase 2 — Melhorias de produto
- [ ] Histórico de conversa
- [ ] Melhorias de UX no chat
- [ ] Salvamento de projetos
- [ ] Geração de personagens e missões

### Fase 3 — Expansão
- [ ] Modo de criação de fases
- [ ] Geração de mapas e sprites
- [ ] Sistema de login
- [ ] Banco de dados

---

## 🔐 Segurança

Nunca compartilhe sua chave da OpenAI publicamente. O arquivo `.env` deve ficar local e protegido.

```gitignore
node_modules/
.env
dist/
```

---

## 👨‍💻 Desenvolvedor

<div align="center">

### Robson Maciel

**Front-End | Desenvolvedor Web | React.js**

Desenvolvedor apaixonado por tecnologia, interfaces modernas e experiência de usuário.

<br>

<a href="https://github.com/RobsonMT2018/gamebot-ai">
  <img src="https://img.shields.io/badge/GitHub-Perfil-181717?style=for-the-badge&logo=github" alt="GitHub">
</a>

</div>

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

### 🎮 GameBot AI

**Transformando ideias em mundos digitais.**

⭐ Se este projeto for útil, deixe uma estrela no repositório!

</div>

---

## 🚀 Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/gamebot-ai.git
```

### 2. Entrar no projeto

```bash
cd gamebot-ai
```

### 3. Instalar dependências do frontend

```bash
cd client
npm install
```

### 4. Instalar dependências do backend

```bash
cd ../server
npm install
```

### 5. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `server`:

```env
OPENAI_API_KEY=sua_chave_da_api
PORT=3001
```

### 6. Iniciar o backend

```bash
cd server
npm run dev
```

### 7. Iniciar o frontend

Em outro terminal:

```bash
cd client
npm run dev
```

Acesse o endereço informado pelo Vite.

---

## 🗺️ Roadmap

### 🟢 Fase 1 — Fundação

- [x] Criar repositório no GitHub.
- [x] Criar README.md.
- [x] Configurar frontend React.
- [x] Configurar backend Node.js.
- [x] Criar interface inicial.
<<<<<<< HEAD
- [x] Integrar API de IA.
=======
- [-] Integrar API de IA.
>>>>>>> 78557ab (feat: melhora visual do chat e documentação do projeto)

### 🔵 Fase 2 — Game Studio

- [ ] Gerador de ideias de jogos.
- [ ] Gerador de personagens.
- [ ] Gerador de missões.
- [ ] Gerador de inimigos.
- [ ] Sistema de projetos.

### 🟣 Fase 3 — Recursos Avançados

- [ ] Histórico de conversas.
- [ ] Login de usuários.
- [ ] Banco de dados.
- [ ] Gerador de código.
- [ ] Editor de protótipos.
- [ ] Integração com Phaser.
- [ ] Integração com Three.js.

### 🚀 Fase 4 — Publicação

- [ ] Testes automatizados.
- [ ] Deploy do frontend.
- [ ] Deploy do backend.
- [ ] Documentação completa.
- [ ] Publicação da primeira versão.

---

## 🖼️ Preview

> Interface gamer futurista com assistente de IA,
> painel de projetos e ferramentas para desenvolvimento
> de jogos digitais.

Em breve, imagens e demonstrações do projeto serão
adicionadas aqui.

---

## 🔐 Segurança

Nunca publique sua chave de API.

Adicione o arquivo `.env` ao `.gitignore`:

```gitignore
node_modules/
.env
dist/
```

---

## 👨‍💻 Desenvolvedor

<div align="center">

### Robson Maciel

**Front-End | Desenvolvedor Web | React.js**

Desenvolvedor apaixonado por programação,
tecnologia e criação de experiências digitais.

<br>

<a href="https://github.com/RobsonMT2018/gamebot-ai">
  <img src="https://img.shields.io/badge/GitHub-Perfil-181717?style=for-the-badge&logo=github" alt="GitHub">
</a>

</div>

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

### 🎮 GameBot AI

**Transformando ideias em mundos digitais.**

⭐ Se este projeto for útil, deixe uma estrela no repositório!

</div>
