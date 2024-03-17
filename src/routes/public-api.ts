import express from 'express'
import { UserController } from '../controller/user-controller'

export const publicRouter = express.Router()

publicRouter.get('/api/register', UserController.register)