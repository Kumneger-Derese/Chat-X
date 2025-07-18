import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: {
      minLength: 3,
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

//Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//Check password isMatched when loggin
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = model('User', userSchema)
export default User
