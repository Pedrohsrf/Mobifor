import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

import Login from "./pages/Login"
import Home from "./pages/Home"
import Cadastro from "./pages/Cadastro"
import AdminHome from "./pages/AdminHome"

import ProtectedRoute from "./components/routes/ProtectedRoute"

import "bootstrap-icons/font/bootstrap-icons.css"

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute redirectAdminFromHome>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}