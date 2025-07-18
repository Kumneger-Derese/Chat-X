import { useAuthStore } from "@/store/authStore"
import type { ApiResponse } from "@/types"
import { extractTime } from "@/utils/extractTime"
import { PersonStanding } from "lucide-react"

type ChatMessageProps = {
  message: ApiResponse
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { userInfo } = useAuthStore()
  const shakeClass = message?.shouldShake ? 'shake' : ''
  const isSender = userInfo?._id === message.senderId


  return (
    <div className={`chat ${isSender && 'chat-start'} chat-end `}>
      <div className="chat-image avatar">
        <div className="size-10 rounded-full flex items-center justify-center h-full w-full p-1.5 bg-orange-100">
          {/* imag */}
          <PersonStanding className="text-orange-700" />
        </div>
      </div>

      <div className={`chat-bubble ${shakeClass} text-white ${isSender ? 'bg-slate-500' : 'bg-slate-700'}`}>
        {message.message}
      </div>
      <div className="chat-footer mt-1 text-xs opacity-50 flex gap-1 items-center">
        {extractTime(message.createdAt)}
      </div>
    </div>
  )
}
export default ChatMessage