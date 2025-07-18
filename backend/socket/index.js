import http from 'node:http'
import express from 'express'
import { Server } from 'socket.io'
import { logger } from '../config/logger.js'

const app = express()
const server = http.createServer(app)
const frontEndUrl = process.env.FRONTEND_URL
const io = new Server(server, { cors: { origin: frontEndUrl } })

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

const userSocketMap = {} //{userId : socket.id}

io.on('connection', (socket) => {
  logger.info(`User ${socket.id} connected.`)

  // get query from frontend & map it to socket id
  const userId = socket.handshake.query.userId
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id
  }

  //user is got online we need to update onlineusers
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  //logic handlers here

  socket.on('disconnect', () => {
    logger.warn(`User ${socket.id} disconnected.`)
    delete userSocketMap[userId]

    //since a user is got ofline we need to update online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap))

  })
})

export { app, io, server, getReceiverSocketId }
