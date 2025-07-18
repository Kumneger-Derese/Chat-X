import { useEffect, useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { useRegisterUser } from "@/hooks/useUserApi"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"

const Registerpage = () => {
  const { userInfo } = useAuthStore()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ""
  })

  const navigate = useNavigate()
  const { mutate, isPending } = useRegisterUser()

  // if not logged in donot go for secured route
  useEffect(() => {
    if (userInfo) {
      navigate('/', { replace: true })
    }
  }, [userInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(userData, {
      //reset userdata on submit
      onSuccess: () => {
        navigate('/')
        setUserData({
          username: '',
          email: '',
          password: ""
        })
      }
    })
  }
  return (
    <div className="">
      <form noValidate onSubmit={handleSubmit} className="flex max-sm:h-screen py-8 px-10 lg:px-16 flex-col gap-y-3 bg-linear-180 from-neutral-50 to-neutral-300 rounded-b-2xl w-full sm:w-4/6 lg:w-3/6 mx-auto">
        <h1 className="font-bold text-2xl text-red-600 mb-4">Register</h1>
        {/* username field */}
        <div>
          <label htmlFor="username" className="label font-medium mb-1">Username:</label>
          <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Kim Biruk" className="p-2 rounded-md border-2 border-neutral-400 outline-orange-400 w-full" />
        </div>

        {/* email field */}
        <div>
          <label htmlFor="email" className="label font-medium mb-1">Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="kimbruk@example.com" className="p-2 rounded-md border-2 border-neutral-400 outline-orange-400 w-full" />
        </div>

        {/* password field */}
        <div>
          <label htmlFor="password" className="label font-medium mb-1">Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="*******" className="p-2 rounded-md border-2 border-neutral-400 outline-orange-400 w-full" />
        </div>

        <Button type="submit" size={'lg'} className="mt-4 p-1">
          {isPending ? 'Processing...' : "Register"}
        </Button>

        <p>Already have account? <Link className="text-blue-600 hover:underline" to={'/login'}>Login.</Link></p>
      </form>
    </div>
  )
}
export default Registerpage