import { useConversation } from "@/store/useConversation"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import NoChatSelected from "./NoChatSelected"

const MessageContainer = () => {
  const { selectedConversation } = useConversation()

  return (
    <div className="h-screen w-8/12 flex flex-col">
      {
        !selectedConversation ? <NoChatSelected /> :
          (
            <>
              <div className="bg-slate-500 text-white px-4 py-4 mb-2">
                <span className="label">To: </span> {' '}
                <span className="font-semibold text-gray-200">{selectedConversation.username}</span>
              </div>

              <Messages />
              <MessageInput />
            </>

          )
      }
    </div >
  )
}
export default MessageContainer