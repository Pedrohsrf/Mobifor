// Back/routes/estacionamentoRoutes.js
import express from 'express';
import {
  listarEstacionamentos,
  obterEstacionamento,
  criarEstacionamento,
  atualizarEstacionamento,
  deletarEstacionamento
} from '../controllers/estacionamentoController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';
import { verificarAdmin } from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.get('/listar', listarEstacionamentos);
router.get('/:id', autenticarToken, obterEstacionamento);
router.post('/criar', autenticarToken, verificarAdmin, criarEstacionamento);
router.put('/:id', autenticarToken, verificarAdmin, atualizarEstacionamento);
router.delete('/:id', autenticarToken, verificarAdmin, deletarEstacionamento);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /estacionamentos não encontrada',
    caminho: req.originalUrl
  });
});

export default router;