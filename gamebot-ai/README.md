# GameBot AI

GameBot AI é um assistente inteligente para criação de jogos digitais, com frontend em React e backend em Node.js/Express.

## Estrutura do projeto

```text
gamebot-ai/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── .gitignore
├── README.md
├── package.json
└── .env
```

## Como executar

### 1. Instalar dependências

```bash
npm install
npm --prefix client install
npm --prefix server install
```

### 2. Iniciar backend

```bash
npm --prefix server run server
```

### 3. Iniciar frontend

```bash
npm --prefix client run dev
```

### 4. Iniciar tudo em um único comando

```bash
npm run dev
```

## Variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `server` com valores como:

```env
PORT=5000
```
