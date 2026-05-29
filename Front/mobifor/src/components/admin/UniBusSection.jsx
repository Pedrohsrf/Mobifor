import { useEffect, useState } from "react"

import AdminUniBusModal from "../map/modals/AdminUniBusModal"

import { listarOnibus } from "../../services/onibusServices"

export default function UniBusSection() {

  const [selectedBus, setSelectedBus] = useState(null)

  const [onibus, setOnibus] = useState([])

  const [loading, setLoading] = useState(true)

  const [erro, setErro] = useState("")

  useEffect(() => {

    async function carregarOnibus() {

      try {

        const data = await listarOnibus()

        setOnibus(data)

      } catch (err) {

        console.error(err)

        setErro("Erro ao carregar ônibus.")

      } finally {

        setLoading(false)
      }
    }

    carregarOnibus()

  }, [])

  function handleBusUpdated(busAtualizado) {

  setOnibus((prev) =>
    prev.map((bus) =>
      bus._id === busAtualizado._id
        ? busAtualizado
        : bus
    )
  )
}

  return (
    <>
      <section className="bg-gray-100 rounded-2xl border border-blue-200 shadow-sm p-8 mb-10">

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Gerenciamento - UniBus
        </h2>

        {loading && (
          <p className="text-center text-blue-600 font-semibold">
            Carregando ônibus...
          </p>
        )}

        {erro && (
          <p className="text-center text-red-500 font-semibold">
            {erro}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-6">

          {onibus.map((bus) => (

            <div
              key={bus._id}
              className="flex flex-col items-center gap-3"
            >

              <div className="flex flex-col items-center justify-center gap-2 w-32 h-32 rounded-2xl border border-gray-200 shadow-sm bg-white p-4 hover:shadow-md transition">

                <i className="bi bi-bus-front-fill text-blue-500 text-4xl" />

                <span className="text-sm font-semibold text-gray-700">
                  UniBus {bus.numero}
                </span>

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

      <AdminUniBusModal

      bus={selectedBus}
      onClose={() => setSelectedBus(null)}
      onBusUpdated={(busAtualizado) => {
        setOnibus((prev) =>
          prev.map((bus) =>
          bus._id === busAtualizado._id
            ? busAtualizado
            : bus
            )
          )
        setSelectedBus(busAtualizado)
      }}  
      />
    </>
  )
}