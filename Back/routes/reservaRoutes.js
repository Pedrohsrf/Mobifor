// Back/routes/reservaRoutes.js
import express from 'express';
import {
  listarReservas,
  obterReserva,
  criarReserva,
  atualizarReserva,
  cancelarReserva
} from '../controllers/reservaController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/listar', autenticarToken, listarReservas);
router.get('/:id', autenticarToken, obterReserva);
router.post('/criar', autenticarToken, criarReserva);
router.put('/:id', autenticarToken, atualizarReserva);
router.delete('/:id', autenticarToken, cancelarReserva);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /reservas não encontrada',
    caminho: req.originalUrl
  });
});

export default router;