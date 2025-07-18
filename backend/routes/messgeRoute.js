import { Router } from 'express'
import {
  sendMessage,
  getMessages,
  markMessagesAsSeen,
  getUnseenMessageCount,
  getConversationUnseenMessagesCount,
} from '../controller/messageController.js'
import { protectRoute } from '../middleware/protectRoute.js'

const messagerouter = Router()

messagerouter.use(protectRoute)

messagerouter.get('/:receiverId', getMessages)
messagerouter.post('/send/:receiverId', sendMessage)
messagerouter.get('/seen/:conversationId', markMessagesAsSeen)
messagerouter.get('/unseen', getUnseenMessageCount)
messagerouter.get('/unseen-count/:conversationId', getConversationUnseenMessagesCount)

export default messagerouter