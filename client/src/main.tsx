import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from "./pages/HomePage.tsx"
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css'
import ProfilePage from './pages/ProfilePage.tsx'
import CreatePage from './pages/CreatePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage/>}/> 
        <Route path='/create' element={<CreatePage/>}/> 
        <Route path='/profile/:id' element={<ProfilePage/>}/> 
        <Route path='/login' element={<LoginPage/>}/> 
        <Route path='/register' element={<RegisterPage/>}/> 
        <Route path='*' element={<h1>404 Oldal nem található!</h1>}/>
      </Routes>
    </BrowserRouter>
    
    <ToastContainer 
    position="bottom-right"
    autoClose={5000}
    limit={3}
    closeOnClick
    hideProgressBar={false}
    newestOnTop={false}
    rtl={false}
    theme="dark"
    pauseOnFocusLoss
    draggable
    pauseOnHover
    transition={Slide}/>
  </StrictMode>
)