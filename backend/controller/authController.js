import User from "../model/userModel.js"
import { generateToken } from "../utils/generateToken.js"
import { asyncHandler } from "../middleware/asyncHandler.js"
import { ApiError } from '../utils/apiError.js'

// Register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body

  let user = await User.findOne({ email })

  if (user) {
    return next(new ApiError('User already registered, please login.', 401))
  }

  user = await User.create({ username, email, password })

  if (user) {
    const token = generateToken(user._id)
    res.status(201).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      token
    })
  } else {
    return next(new ApiError('Invalid user data.', 400))
  }
})

//Login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return next(new ApiError('User not found. Please register first.', 404))
  }

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id)
    res.status(200).json({
      username: user.username,
      email: user.email,
      _id: user._id,
      token
    })
  } else {
    return next(new ApiError('Invalid email or password.', 400))
  }
})

export { registerUser, loginUser }