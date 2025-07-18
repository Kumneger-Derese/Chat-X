import Navbar from "@/components/Navbar"
import { useLocation } from "react-router-dom"

const Homepage = () => {
  const location = useLocation()

  const hideNavBars = ['/login', '/register']
  const shouldHideNavBar = hideNavBars.includes(location.pathname)
  return (
    <div className=''>
      {!shouldHideNavBar && <Navbar />}

      <div className='flex h-screen w-full items-center justify-center'>
        <h1 className="font-bold text-3xl text-orange-700">
          Home page
        </h1>
      </div>
    </div>
  )
}
export default Homepage