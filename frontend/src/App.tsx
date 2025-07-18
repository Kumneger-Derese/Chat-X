import { Toaster, } from 'react-hot-toast'
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Toaster position='top-center' />
      <Outlet />
    </div>
  )
};

export default App;
