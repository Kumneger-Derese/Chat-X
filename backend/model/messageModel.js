import { Schema, model } from 'mongoose'

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Message = model('Message', messageSchema)
export { Message }


// imageUrl: {
//   type: String,
//   default: ''
// },
// seen: {
//   type: Boolean,
//   default: false
// }