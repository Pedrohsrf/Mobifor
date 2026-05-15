// Back/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './config/database.js';

// Importando Rotas
import usuarioRoutes from './routes/usuarioRoutes.js';
import vagaRoutes from './routes/vagaRoutes.js';
import estacionamentoRoutes from './routes/estacionamentoRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import onibusRoutes from './routes/onibusRoutes.js';
import rotaRoutes from './routes/rotaRoutes.js';
import horarioRoutes from './routes/horarioRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.send('API do Mobifor - Controle de Vagas UNIFOR');
});

// Usar as rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vagas', vagaRoutes);
app.use('/api/estacionamentos', estacionamentoRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/onibus', onibusRoutes);
app.use('/api/rotas', rotaRoutes);
app.use('/api/horarios', horarioRoutes);

// Rota coringa: deve ser a última
app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});  
