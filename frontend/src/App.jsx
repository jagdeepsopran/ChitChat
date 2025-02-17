import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/UseAuthStore'
import { useThemeStore } from './store/UseThemeStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

console.log(onlineUsers);


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className="size-28 animate-spin" />
    </div>
  )

  return (
    <BrowserRouter>
      <div data-theme={theme}>
        <Navbar />

        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        </Routes>

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </BrowserRouter>
  )
}
export default App