import { Send } from "lucide-react"
import { Button } from "../ui/button"
import React, { useState } from "react"
import { useConversation } from "@/store/useConversation"
import { useSendMessage } from "@/hooks/useConversationApi"
import toast from "react-hot-toast"

const MessageInput = () => {
  const { selectedConversation } = useConversation();
  const [message, setMessage] = useState<string>('')

  const { mutate, isPending } = useSendMessage()

  //handle mesg input change
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  //handle mesg submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!message) {
      toast.error('chat message is required.')
    }

    mutate({ message, receiverId: selectedConversation?._id || null })
    setMessage('')
  }


  return (
    <form onSubmit={handleSubmit} className="px-4 my-3">
      <div className=" w-full md:w-4/6 mx-auto flex items-center  gap-4 relative">
        {/* message input field */}
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder={isPending ? 'Sending' : "Send a message"}
          className="input input-md text-sm  rounded-lg bg-gray-700 p-2.5 block w-full text-white"
        />

        {/* send button */}
        <Button size={'icon'} className="border border-orange-500 hover:bg-orange-300 bg-orange-200 rounded-full p-2 flex items-center justify-center">
          {isPending ? <div className="loading loading-spinner loading-lg"></div> : <Send className="size-5 text-orange-500" />}
        </Button>
      </div>
    </form>
  )
}
export default MessageInput