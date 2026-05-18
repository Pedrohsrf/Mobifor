import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import AdminHome from './pages/AdminHome'
import Footer from './components/layout/Footer'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}