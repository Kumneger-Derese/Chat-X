import React, { useState } from "react"
import { Button } from "../ui/button"
import { Search } from 'lucide-react'
import toast from "react-hot-toast"
import { useGetConversation } from "@/hooks/useConversationApi"
import { useConversation } from "@/store/useConversation"


const SearchInput = () => {
  const [search, setSearch] = useState<string>('')
  const { setSelectedConversation } = useConversation()
  const { data: conversations } = useGetConversation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      setSearch('')
      return toast.error('Search term must be at least 3 chsrcters long.')
    }
    const conversation = conversations?.find((c) => c.username.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    } else {
      return toast.error('Username not found.')
    }

  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2 items-center">
      <input
        type="search"
        value={search}
        onChange={handleInputChange}
        placeholder="Search...."
        className="input rounded-md input-md border" />
      <Button size={'icon'} className="bg-orange-500"><Search /></Button>
    </form>
  )
}
export default SearchInput