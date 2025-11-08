import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from "./pages/Home.tsx"
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/login' element={<Login/>}/> 
        <Route path='/register' element={<Register/>}/> 
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