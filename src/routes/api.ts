import express from 'express'
import { UserController } from '../controller/user-controller'
import { app } from '../app/app'
import { authMiddleware } from '../middleware/auth-middleware'
import { PostController } from '../controller/post-controller'

export const apiRouter = express.Router()

apiRouter.use(authMiddleware)

// Auth API
apiRouter.get('/api/users', UserController.get)
apiRouter.patch('/api/users', UserController.update)

// Post API
apiRouter.post('/api/posts', PostController.create)
apiRouter.put('/api/posts/:id', PostController.update)
apiRouter.delete('/api/posts/:id', PostController.delete)
