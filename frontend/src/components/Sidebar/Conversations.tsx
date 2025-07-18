import Conversation from "./Conversation"
import { useGetConversation } from "@/hooks/useConversationApi"

const Conversations = () => {
  const { data: conversations, isLoading } = useGetConversation()

  if (isLoading) {
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="font-bold text-4xl text-orange-500">Loading....</h1>
    </div>
  }

  return (
    <div className="flex flex-col py-2 overflow-auto">
      {
        conversations?.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      }
    </div>
  )
}
export default Conversations