import App from '../App.tsx'
import Chatpage from '../pages/Chatpage.tsx'
import Loginpage from '../pages/Loginpage.tsx'
import Registerpage from '../pages/Registerpage.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.tsx'
import Profilepage from '@/pages/Profilepage.tsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />} >
    <Route path='/login' element={<Loginpage />} />
    <Route path='/register' element={<Registerpage />} />

    {/* Protected route */}
    <Route path='' element={<ProtectedRoute />}>
      <Route index path='' element={<Chatpage />} />
      <Route path='/profile' element={<Profilepage />} />
    </Route>
  </Route>
))

export default router