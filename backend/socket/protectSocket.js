import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'
import { logger } from '../config/logger.js'
import { ApiError } from '../utils/apiError.js'

const protectSocket = async (socket) => {

  const token = socket.handshake.auth.token

  if (!token) {
    return new ApiError('No socket token provided', 400)
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    socket.user = await User.findById({ _id: decoded.userId }).select('-password')
    logger.info(`User ${socket.user.username} connected.`)
  } catch (error) {
    console.log('socket middleware Error: ', error)
    return new ApiError('Socket Auth Error (Invalid token)', 400)
  }
}

export { protectSocket }