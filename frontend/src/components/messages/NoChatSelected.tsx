import { useAuthStore } from "@/store/authStore"
import { MessagesSquare } from "lucide-react"

const NoChatSelected = () => {
  const { userInfo } = useAuthStore()

  return (
    <div className="hidden md:flex items-center justify-center w-full h-full ">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-700 font-semibold flex flex-col items-center gap-2">
        <p className="capitalize">Welcome 👋,{userInfo?.username} </p>
        <p className="text-sm">Select a chat to start messaging.</p>
        <MessagesSquare className="size-8 md:size-14 text-orange-700 text-center" />
      </div>
    </div>
  )
}
export default NoChatSelected