// Back/routes/rotaRoutes.js
import express from 'express';
import {
  listarRotas,
  obterRota,
  criarRota,
  atualizarRota,
  deletarRota
} from '../controllers/rotaController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';
import { verificarAdmin } from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.get('/listar', listarRotas);
router.get('/:id', obterRota);
router.post('/criar', autenticarToken, verificarAdmin, criarRota);
router.put('/:id', autenticarToken, verificarAdmin, atualizarRota);
router.delete('/:id', autenticarToken, verificarAdmin, deletarRota);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /rotas não encontrada',
    caminho: req.originalUrl
  });
});

export default router;