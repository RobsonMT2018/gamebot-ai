const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const gameRoutes = require('./routes/gameRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'gamebot-ai',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', gameRoutes);

app.use(errorHandler);

module.exports = app;
