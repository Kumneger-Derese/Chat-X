import ChatMessage from "./ChatMessage"
import { useConversation } from "@/store/useConversation"
import { useGetMessages } from "@/hooks/useConversationApi"
import { useEffect, useRef } from "react"
import useListenMessages from "@/hooks/useListenMessages"

const Messages = () => {
  //hook to sync real time data to database query | history
  useListenMessages()
  const lastMessageRef = useRef<HTMLDivElement>(null)

  const { selectedConversation, messages, setMessages } = useConversation()
  const id = selectedConversation?._id as string

  const { data: messageData, isLoading, isSuccess } = useGetMessages(id)

  useEffect(() => {
    if (isSuccess) {
      setMessages(messageData)
    }
  }, [messageData])

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        (lastMessageRef.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }, [messages])


  return (
    <div className="flex-1 px-4 overflow-auto">
      {/* Loadinf state */}
      {
        isLoading && (<div className="h-screen w-full flex items-center justify-center">
          <h1 className="font-bold text-4xl text-orange-500">Loading....</h1>
        </div>)
      }

      {/* No conversation state */}
      {
        messages?.length === 0 && (
          <div className="h-full flex items-center justify-center" >
            <p className="text-center">Send message to start coversation with <span className="font-semibold text-orange-600">{selectedConversation?.username}</span>.</p>
          </div>
        )
      }

      {/* Rendering chat message */}
      {
        messages?.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <ChatMessage message={message} />
          </div>
        ))
      }

    </div >
  )
}
export default Messages