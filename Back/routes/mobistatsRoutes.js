import express from 'express'

import { obterMobistats } from '../controllers/mobistatsController.js'

import { autenticarToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', autenticarToken, obterMobistats)

export default router