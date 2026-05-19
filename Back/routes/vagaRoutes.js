// Back/routes/vagaRoutes.js
import express from 'express';
import {
  listarVagas,
  obterVaga,
  criarVaga,
  atualizarVaga,
  deletarVaga
} from '../controllers/vagaController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';
import { verificarAdmin } from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.get('/listar', listarVagas);
router.get('/:id', autenticarToken, obterVaga);
router.post('/criar', autenticarToken, verificarAdmin, criarVaga);
router.put('/:id', autenticarToken, verificarAdmin, atualizarVaga);
router.delete('/:id', autenticarToken, verificarAdmin, deletarVaga);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /vagas não encontrada',
    caminho: req.originalUrl
  });
});

export default router;
