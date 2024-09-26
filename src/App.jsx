import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth.service'
import './App.css'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal;
     const fetchCurrentUser = async () => {
      try {
        setLoading(true)
        const userData = await authService.getCurrentUser(signal)
        if(userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        console.error(`Error getting current user: ${error.message}`);
     } finally {
        setLoading(false)
     }
  };
    
    fetchCurrentUser();
    // cleanup function runs after component is unmounted
    return () => {
      setLoading(false)
      controller.abort("Request aborted");
    }
  },[dispatch])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'> 
      <div className='w-full block'>
        <Header />
        <main>
           <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
