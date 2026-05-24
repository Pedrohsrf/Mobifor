import express from 'express';

import {
  listarReservas,
  listarReservasPendentes,
  listarMinhasReservas,
  obterReserva,
  criarReserva,
  atualizarReserva,
  aprovarReserva,
  rejeitarReserva,
  cancelarReserva
} from '../controllers/reservaController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';
import { verificarAdmin } from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.get('/listar', autenticarToken, verificarAdmin, listarReservas);
router.get('/pendentes', autenticarToken, verificarAdmin, listarReservasPendentes);
router.get('/minhas', autenticarToken, listarMinhasReservas);

router.get('/:id', autenticarToken, obterReserva);

router.post('/criar', autenticarToken, criarReserva);

router.patch('/:id/aprovar', autenticarToken, verificarAdmin, aprovarReserva);
router.patch('/:id/rejeitar', autenticarToken, verificarAdmin, rejeitarReserva);
router.patch('/:id', autenticarToken, verificarAdmin, atualizarReserva);

router.delete('/:id/cancelar', autenticarToken, cancelarReserva);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /reservas não encontrada',
    caminho: req.originalUrl
  });
});

export default router;