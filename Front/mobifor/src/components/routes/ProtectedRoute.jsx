import { Navigate } from "react-router-dom"
import { buscarToken, buscarUsuario } from "../../utils/authStorage"

export default function ProtectedRoute({
  children,
  adminOnly = false,
  redirectAdminFromHome = false,
}) {
  const token = buscarToken()
  const usuario = buscarUsuario()

  if (!token || !usuario) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && usuario.tipo !== "admin") {
    return <Navigate to="/home" replace />
  }

  if (redirectAdminFromHome && usuario.tipo === "admin") {
    return <Navigate to="/admin" replace />
  }

  return children
}