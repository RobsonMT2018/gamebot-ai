import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'GameBot AI Backend funcionando!',
    status: 'online',
    version: '1.0.0',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor saudável',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', chatRoutes);

app.listen(PORT, () => {
  console.log(`GameBot AI Backend rodando em http://localhost:${PORT}`);
});