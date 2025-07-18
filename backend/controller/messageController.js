import { asyncHandler } from '../middleware/asyncHandler.js'
import { Message } from '../model/messageModel.js'
import { Conversation } from '../model/conversationModel.js'
import { getReceiverSocketId, io } from '../socket/index.js'
import { ApiError } from '../utils/apiError.js'

// send messages ////Read bro
const sendMessage = asyncHandler(async (req, res, next) => {
  const { message } = req.body
  const senderId = req.user._id
  const { receiverId } = req.params

  let conversation = await Conversation.findOne({
    participants:
      { $all: [senderId, receiverId] }
  })

  //if the conversation is for first time we create it.
  if (!conversation) {
    conversation = await Conversation.create({ participants: [senderId, receiverId] })
  }

  //create message
  const newMessage = await Message.create({
    senderId, receiverId, message, seenBy: [senderId], conversationId: conversation._id
  })

  //push message id to conversation
  if (newMessage) {
    conversation.messages.push(newMessage._id)
  }

  //save conversation and message -> this will run in parallel
  await Promise.all([conversation.save(), newMessage.save()])

  // socket io functionaity will go here
  const receiverSocketId = getReceiverSocketId(receiverId)
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage)
  }

  res.status(201).json(newMessage)
})

// get messages
const getMessages = asyncHandler(async (req, res, next) => {
  const { receiverId } = req.params
  const senderId = req.user._id

  const conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } }).populate({
    path: 'messages',
    select: '-__v'
  }).select('-__v')

  if (!conversation) return res.status(200).json([])

  const messages = conversation.messages
  res.status(200).json(messages)
})

// get conversation unseen message count
const getConversationUnseenMessagesCount = asyncHandler(async (req, res, next) => {
  const userId = req.user._id
  const { conversationId } = req.params

  const conversation = await Conversation.findById({ _id: conversationId })

  if (!conversation) {
    return next(new ApiError("Conversation not found", 404))
  }

  if (!conversation.participants.includes(userId)) {
    return next(new ApiError("Unauthorized access to conversation", 403))
  }

  const conversationUnseenMessagesCount = await Message.countDocuments({
    conversationId: conversation._id,
    receiverId: userId,
    seenBy: { $ne: userId }
  })

  const response = { unseenCount: conversationUnseenMessagesCount }

  res.status(200).json(response)
})

// get all unseen message count
const getUnseenMessageCount = asyncHandler(async (req, res, next) => {
  const userId = req.user._id

  const unseenMessageCount = await Message.countDocuments({
    receiverId: userId,
    seenBy: { $ne: userId }    // Where userId is NOT in seenBy array
  })

  res.status(200).json({ allUnseenCount: unseenMessageCount })
})


// mark message as seen
const markMessagesAsSeen = asyncHandler(async (req, res, next) => {
  const userId = req.user._id; // Authenticated user ID
  const { conversationId } = req.params;

  const result = await Message.updateMany(
    {
      conversationId,
      receiverId: userId,
      seenBy: { $ne: userId }
    }, {
    $addToSet: { seenBy: userId } // Add userId to seenBy array if not already present
  }
  )

  res.status(200).json({ message: `${result.modifiedCount} messages marked as seen.` })
})

export {
  sendMessage,
  getMessages,
  markMessagesAsSeen,
  getUnseenMessageCount,
  getConversationUnseenMessagesCount
}