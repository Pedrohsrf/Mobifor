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

const router = express.Router();

router.get('/listar', listarVagas);
router.get('/:id', autenticarToken, obterVaga);
router.post('/criar', autenticarToken, criarVaga);
router.put('/:id', autenticarToken, atualizarVaga);
router.delete('/:id', autenticarToken, deletarVaga);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /vagas não encontrada',
    caminho: req.originalUrl
  });
});

export default router;