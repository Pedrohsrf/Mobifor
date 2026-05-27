import ParkingMap from "../components/map/ParkingMap"
import AdminSection from "../components/admin/AdminSection"
import ReservaValidacaoSection from '../components/admin/ReservaValidacaoSection'
import UniBusSection from '../components/admin/UniBusSection'
import { buscarUsuario } from "../utils/authStorage"

export default function AdminHome() {
  const usuario = buscarUsuario()

  return (
    <main className="min-h-[calc(100vh-128px)] bg-blue-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-6 py-4">
        Olá, {usuario?.nome || "administrador"}!
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <ParkingMap />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-10" id="Gerenciamento">
        <ReservaValidacaoSection />
        <UniBusSection />
      </div>
    </main>
  )
}