import User from '../model/userModel.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { generateToken } from '../utils/generateToken.js'

// getUser for sidebar
const getUsersForSidebar = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user._id

  if (!loggedInUser) {
    return next(new ApiError('User not found.', 404))
  }

  const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select('-password -__v')

  res.status(200).json(filteredUser)
})

// Get user profile
const getUserProfile = asyncHandler(async (req, res, next) => {
  const id = req.user._id

  const user = await User.findById({ _id: id })

  if (!user) {
    return next(new ApiError('User to get not found.', 404))
  }

  res.status(200).json({
    username: user.username,
    email: user.email,
    _id: user._id
  })
})

// Update profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const id = req.user._id
  const user = await User.findById({ _id: id })

  if (!user) {
    return next(new ApiError('User to update not found.', 404))
  }

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }
  } else {
    return next(new ApiError('User to update not found.', 404))
  }

  const updatedUser = await user.save()

  const token = generateToken(updatedUser._id)
  res.status(200).json({
    username: updatedUser.username,
    email: updatedUser.email,
    _id: updatedUser._id,
    token
  })
})

//Delete account
const deleteAccount = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString()
  const id = req.params.id.toString()

  //check if the requester is user
  if (userId !== id) {
    return next(new ApiError('Not authorized to delete this account.', 403))
  }

  const user = await User.findById({ _id: id })

  //check if user exists
  if (!user) {
    return next(new ApiError('User to delete not found.', 404))
  }

  await User.findByIdAndDelete({ _id: id })
  res.status(200).json({ message: 'Account Deleted.' })
})

export {
  getUsersForSidebar,
  getUserProfile,
  updateUserProfile,
  deleteAccount
}
