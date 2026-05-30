import { useState } from "react"

import ParkingMap from "../components/map/ParkingMap"
import AdminSection from "../components/admin/AdminSection"
import ReservaValidacaoSection from '../components/admin/ReservaValidacaoSection'
import UniBusSection from '../components/admin/UniBusSection'
import { buscarUsuario } from "../utils/authStorage"

export default function AdminHome() {
  const usuario = buscarUsuario()
  const [atualizarMapa, setAtualizarMapa] = useState(0)

  function handleAtualizarMapa() {
    setAtualizarMapa((prev) => prev + 1)
  }

  return (
    <main className="min-h-[calc(100vh-128px)] bg-blue-50 px-6 py-8">
      <div className="max-w-[1540px] mx-auto">

        <div className="mb-7 ml-6">
          <p className="text-sm font-semibold text-blue-600 mb-1">
            Bem-vindo ao painel administrativo
          </p>

          <h1 className="text-2xl font-bold text-gray-800">
            Olá, {usuario?.nome || "administrador"}!
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <ParkingMap refreshTrigger={atualizarMapa} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mt-10" id="Gerenciamento">
          <ReservaValidacaoSection onReservaAtualizada={handleAtualizarMapa} />
          <UniBusSection />
        </div>

      </div>
    </main>
  )
}