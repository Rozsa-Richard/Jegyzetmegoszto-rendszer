import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from "./pages/HomePage.tsx"
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import CreatePage from './pages/CreatePage.tsx'
import NotePage from './pages/NotePage.tsx'
import UpdatePage from './pages/UpdatePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import ProfilesPage from './pages/ProfilesPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<HomePage/>}/> 
        <Route path='/create' element={<CreatePage/>}/> 
        <Route path='/note/:id' element={<NotePage/>}/> 
        <Route path='/profiles' element={<ProfilesPage/>}/> 
        <Route path='/profile/:id' element={<ProfilePage/>}/> 
        <Route path='/edit/:id' element={<UpdatePage/>}/>
        <Route path='/login' element={<LoginPage/>}/> 
        <Route path='/register' element={<RegisterPage/>}/> 
        <Route path='*' element={<NotFoundPage />}/>
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