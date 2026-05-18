import ParkingMap from "../components/layout/ParkingMap"

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-128px)] bg-blue-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Olá, Pedro Henrique!
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <ParkingMap />
      </div>
    </main>
  )
}