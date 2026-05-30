import ParkingMap from "../components/map/ParkingMap"
import MobistatsSection from "../components/parking/MobistatsSection"
import MinhasReservasSection from "../components/parking/MinhasReservasSection"
import InformationSection from "../components/layout/InformationSection"
import { buscarUsuario } from "../utils/authStorage"

export default function Home() {
  const usuario = buscarUsuario()

  return (
    <main className="min-h-[calc(100vh-128px)] bg-blue-50 px-6 py-8">
      <div className="max-w-[1540px] mx-auto">

        <div className="mb-7 ml-6">
          <p className="text-sm font-semibold text-blue-600 mb-1">
            Bem-vindo ao MOBIFOR
          </p>

          <h1 className="text-2xl font-bold text-gray-800">
            Olá, {usuario?.nome || "aluno"}!
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <ParkingMap />
        </div>

        <MobistatsSection />

        <MinhasReservasSection />

        <InformationSection />

      </div>
    </main>
  )
}