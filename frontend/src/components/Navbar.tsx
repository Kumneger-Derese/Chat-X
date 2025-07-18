import { useAuthStore } from "@/store/authStore"

const Navbar = () => {
  const { userInfo } = useAuthStore()
  return (
    <div className="min-h-12 sticky top-0 flex justify-between  items-center px-12 bg-background shadow">
      <h1 className='font-bold text-2xl'>Chat <span className='italic text-orange-600'>X</span></h1>

      <p className="font-bold text-xl capitalize">{userInfo?.username}</p>
    </div>
  )
}
export default Navbar