import { useState } from 'react'
import UniBusModal from './UniBusModal'

const unibusMock = [
  { id: 1, nome: 'UniBus 1' },
  { id: 2, nome: 'UniBus 2' },
  { id: 3, nome: 'UniBus 3' },
  { id: 4, nome: 'UniBus 4' },
  { id: 5, nome: 'UniBus 5' },
]

export default function UniBusSection() {
  const [selectedBus, setSelectedBus] = useState(null)

  return (
    <>
      <section className="bg-gray-100 rounded-2xl border border-blue-200 shadow-sm p-8 mb-10">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Gerenciamento - UniBus
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {unibusMock.map((bus) => (
            <div key={bus.id} className="flex flex-col items-center gap-3">
              <div className="flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-2xl border border-gray-200 shadow-sm bg-white p-4 hover:shadow-md transition">
                <i className="bi bi-bus-front-fill text-blue-500 text-4xl" />
                <span className="text-sm font-semibold text-gray-700">{bus.nome}</span>
              </div>
              <button
                onClick={() => setSelectedBus(bus)}
                className="px-5 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-600 font-medium bg-white hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 active:scale-95 transition shadow-sm"
              >
                Gerenciar
              </button>
            </div>
          ))}
        </div>
      </section>

      <UniBusModal bus={selectedBus} onClose={() => setSelectedBus(null)} />
    </>
  )
}