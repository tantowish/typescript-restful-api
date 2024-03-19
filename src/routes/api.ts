import express from 'express'
import { UserController } from '../controller/user-controller'
import { app } from '../app/app'
import { authMiddleware } from '../middleware/auth-middleware'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

apiRouter.get('/api/user', UserController.get)