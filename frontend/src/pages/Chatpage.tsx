import MessageContainer from "@/components/messages/MessageContainer"
import Sidebar from "@/components/Sidebar/Sidebar"

const Chatpage = () => {

  return (
    <div className='flex overflow-hidden'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}
export default Chatpage