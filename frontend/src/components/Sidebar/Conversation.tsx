import type { Message } from "@/types"
import { User } from "lucide-react"
import { useConversation } from "@/store/useConversation"
import { useEffect } from "react";
import { useSocketContext } from "@/context/socketContext";

type ConversationProps = {
  conversation: Message,
  lastIdx: boolean;
}

const Conversation = ({ conversation, lastIdx }: ConversationProps) => {
  const { onlineUsers } = useSocketContext()
  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === conversation._id
  const isOnline = onlineUsers.includes(conversation._id)

  useEffect(() => {
    // clean up function (on unmounts)
    return () => {
      setSelectedConversation(null)
    }
  }, [setSelectedConversation])


  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 items-center text-gray-900  hover:bg-orange-500 rounded-md p-2 py-1 cursor-pointer ${isSelected && 'bg-orange-500 text-white'}`}>

        {/* avatar */}
        <div className={`avatar ${isOnline ? 'avatar-online' : "avatar-offline"}`} >
          <div className="size-12 rounded-full h-full w-full p-1.5 bg-gray-400 flex items-center justify-center">
            {/* image */}
            <User className="" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between items-center">
            <p className="font-semibold">{conversation.username}</p>
          </div>
        </div>
      </div>

      {/* Conversation divider */}
      {!lastIdx && <div className={`divider my-0 py-0 h-1 ${lastIdx && 'h-1'}`} />}
    </>
  )
}
export default Conversation