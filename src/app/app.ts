import express from 'express'
import { Request, Response } from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'
import { apiRouter } from '../routes/api'

export const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Server is running" })
})

// Router
app.use(publicRouter)
app.use(apiRouter)

// Error middleware
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})