import express from 'express'
import { UserController } from '../controller/user-controller'
import { PostController } from '../controller/post-controller'

export const publicRouter = express.Router()

// Auth API
publicRouter.post('/api/users/register', UserController.register)
publicRouter.post('/api/users/login', UserController.login)

// Post API
publicRouter.get('/api/posts', PostController.getAll)
publicRouter.get('/api/posts/:id', PostController.get)
publicRouter.get('/api/users/:username/posts', PostController.getPostByUser)  