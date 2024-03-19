import express from 'express'
import { UserController } from '../controller/user-controller'

export const publicRouter = express.Router()

// Auth API
publicRouter.post('/api/register', UserController.register)
publicRouter.post('/api/login', UserController.login)