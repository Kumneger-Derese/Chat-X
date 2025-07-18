import { useAuthStore } from '@/store/authStore'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userInfo } = useAuthStore()
  return userInfo?.token ? <Outlet /> : <Navigate to={'/login'} />
}
export default ProtectedRoute