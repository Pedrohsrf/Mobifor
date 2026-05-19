// Back/routes/onibusRoutes.js
import express from 'express';
import {
  listarOnibus,
  obterOnibus,
  criarOnibus,
  atualizarOnibus,
  deletarOnibus
} from '../controllers/onibusController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';
import { verificarAdmin } from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.get('/listar', listarOnibus);
router.get('/:id', obterOnibus);
router.post('/criar', autenticarToken, verificarAdmin, criarOnibus);
router.put('/:id', autenticarToken, verificarAdmin, atualizarOnibus);
router.delete('/:id', autenticarToken, verificarAdmin, deletarOnibus);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /onibus não encontrada',
    caminho: req.originalUrl
  });
});

export default router;