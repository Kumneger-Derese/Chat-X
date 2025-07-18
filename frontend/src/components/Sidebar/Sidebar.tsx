import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
import SearchInput from "./SearchInput"

const Sidebar = () => {
  return (
    <div className="flex w-4/12 h-screen p-4 flex-col gap-y-3 border-r border-slate-500">
      <SearchInput />
      <hr className="px-0.5" />

      <Conversations />
      <LogoutButton />
    </div>
  )
}
export default Sidebar