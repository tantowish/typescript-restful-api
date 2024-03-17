import express from 'express'
import { Request, Response } from 'express'

export const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Server is running" })
})

app.use

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})