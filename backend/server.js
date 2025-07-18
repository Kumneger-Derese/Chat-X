import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { connectDb } from './config/db.js'
import { logger } from './config/logger.js'
import {
  errorConverter,
  errorHandler,
  notFound
} from './middleware/errorMiddleware.js'
import { authRouter } from './routes/authRoute.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messgeRoute.js'
import { app, server } from './socket/index.js'

//* connect to database
connectDb()

const PORT = process.env.PORT
const frontEndUrl = process.env.FRONTEND_URL
const appEnviroment = process.env.NODE_ENV

// * register logger
if (appEnviroment === 'production') {
  app.use(morgan('combined', { stream: logger.stream }))
} else {
  app.use(morgan('dev'))
}

//* register middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: frontEndUrl }))

//* register routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/messages', messageRouter)

//* Error middleware
app.use(notFound)
app.use(errorConverter)
app.use(errorHandler)

server.listen(PORT, () => {
  return logger.info(`Server is running on port ${PORT}`)
})
