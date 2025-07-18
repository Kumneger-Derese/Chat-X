import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from './asyncHandler.js'

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req?.headers?.authorization?.split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById({ _id: decoded.userId }).select(
        '-password'
      )
      next()
    } catch (error) {
      return next(new ApiError('Unauthorized, token failed', 401))
    }
  } else {
    return next(new ApiError('Unauthorized, no token', 401))
  }
})

export { protectRoute }
