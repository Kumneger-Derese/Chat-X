import { Router } from 'express'
import {
  getUserProfile,
  updateUserProfile,
  deleteAccount,
  getUsersForSidebar
} from '../controller/userController.js'
import { validate } from '../middleware/validate.js'
import { protectRoute } from '../middleware/protectRoute.js'
import { profileSchema } from '../validation/userValidation.js'

const userRouter = Router()

userRouter.use(protectRoute)

userRouter.get('/', getUsersForSidebar)
userRouter.route('/profile').put(validate(profileSchema), updateUserProfile).get(getUserProfile)
userRouter.delete('/delete-account/:id', deleteAccount)

export default userRouter
