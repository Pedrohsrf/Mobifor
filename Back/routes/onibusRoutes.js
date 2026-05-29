import express from 'express';

import {
  listarOnibus,
  obterOnibus,
  atualizarOnibus
} from '../controllers/onibusController.js';

import { autenticarToken } from '../middlewares/authMiddleware.js';
import { verificarAdmin } from '../middlewares/verificarAdmin.js';

const router = express.Router();

router.get('/', autenticarToken, listarOnibus);

router.get('/:id', autenticarToken, obterOnibus);

router.put(
  '/:id',
  autenticarToken,
  verificarAdmin,
  atualizarOnibus
);

export default router;