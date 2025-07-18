import { useAuthStore } from "@/store/authStore"
import { LogOut } from "lucide-react"
import { Link } from "react-router-dom"

const LogoutButton = () => {
  const { logout, userInfo } = useAuthStore()

  return (
    <div className="flex justify-between items-center mt-auto ">
      <LogOut onClick={logout} className="text-red-500 cursor-pointer" />

      {/* Link to profile */}
      <Link to={'/profile'} className="avatar avatar-placeholder bg-orange-200 border border-orange-600 text-orange-600 rounded-full p-4 size-2 flex justify-center font-bold items-center">
        {userInfo?.username.split(' ')[0].toUpperCase().charAt(0)}
      </Link>
    </div>
  )
}
export default LogoutButton