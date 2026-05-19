// Back/routes/usuarioRoutes.js
import express from 'express';
import {
  listarUsuarios,
  obterUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  login
} from '../controllers/usuarioController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';
import { verificarAdmin } from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.post('/login', login);
router.get('/listar', autenticarToken, listarUsuarios);
router.get('/:id', autenticarToken, obterUsuario);
router.post('/criar', criarUsuario);
router.put('/:id', autenticarToken, atualizarUsuario);
router.delete('/:id', autenticarToken, verificarAdmin, deletarUsuario);

router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /usuarios não encontrada',
    caminho: req.originalUrl
  });
});

export default router;