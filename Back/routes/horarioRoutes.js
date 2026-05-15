// Back/routes/horarioRoutes.js
import express from 'express';
import {
  listarHorarios,
  obterHorario,
  criarHorario,
  atualizarHorario,
  deletarHorario
} from '../controllers/horarioController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/listar', listarHorarios);
router.get('/:id', obterHorario);
router.post('/criar', autenticarToken, criarHorario);
router.put('/:id', autenticarToken, atualizarHorario);
router.delete('/:id', autenticarToken, deletarHorario);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /horarios não encontrada',
    caminho: req.originalUrl
  });
});

export default router;