import type React from "react"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useDeleteAcount, useGetUser, useUpdateUser } from "@/hooks/useUserApi"

const Profilepage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const deleteAccount = useDeleteAcount()
  const { mutate, isPending } = useUpdateUser()
  const { data: profileData, isLoading } = useGetUser()

  useEffect(() => {
    if (profileData) {
      setUserData({
        username: profileData?.username,
        email: profileData?.email,
        password: ''
      })
    }
  }, [profileData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeleteAccount = async () => {
    if (!profileData?._id) return;

    try {
      await deleteAccount.mutateAsync(profileData._id,)
      logout()
      navigate('/login')
    } catch (error) {
      toast.error('Failed to delete.')
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(userData, {
      //reset userdata on submit
      onSuccess: () => {
        setUserData({
          username: '',
          email: '',
          password: ""
        })
      }
    })
  }

  if (isLoading) {
    <div className="flex h-screen justify-center items-center">
      <h1 className="text-2xl text-orange-600 font-bold">Loading</h1>
    </div>
  }

  return (
    <div className="">
      <form noValidate onSubmit={handleSubmit} className="flex max-sm:h-screen py-8 px-10 lg:px-16 flex-col gap-y-3 bg-neutral-200 rounded-b-2xl w-full sm:w-4/6 lg:w-3/6 mx-auto">
        <h1 className="font-bold text-2xl text-red-600 mb-4">Profile</h1>
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

        <div className="flex gap-4 items-center w-full mt-4">
          <Button type="submit" size={'lg'} className=" p-1 flex-3/5">
            {isPending ? 'Processing...' : "Update"}
          </Button>

          <Button variant={'destructive'} className="flex-1" size={'lg'} onClick={handleDeleteAccount}>Delete Account</Button>
        </div>

      </form>
    </div>
  )
}
export default Profilepage