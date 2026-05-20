import { useState } from 'react'

const reservasMock = [
  { id: 1, matricula: '2423339', status: 'pendente' },
  { id: 2, matricula: '2423340', status: 'pendente' },
  { id: 3, matricula: '2423341', status: 'pendente' },
  { id: 4, matricula: '2423342', status: 'pendente' },
  { id: 5, matricula: '2423343', status: 'pendente' },
  { id: 6, matricula: '2423344', status: 'pendente' },
  { id: 7, matricula: '2423345', status: 'pendente' },
]

export default function ReservaValidacaoSection() {
  const [reservas, setReservas] = useState(reservasMock)

  const handleAprovar = (id) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'aprovado' } : r))
    )
  }

  const handleRejeitar = (id) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejeitado' } : r))
    )
  }

  return (
    <section className="bg-gray-100 rounded-2xl border border-blue-200 shadow-sm p-8 mt-4 mb-10">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
        Validação de reserva
      </h2>

      <div className="flex flex-wrap justify-center gap-5">
        {reservas.map((reserva) => (
          <div key={reserva.id} className="flex flex-col items-center gap-2">
            <div className={`flex flex-col items-center justify-center gap-1 w-24 h-28 rounded-2xl border shadow-sm bg-white p-3 transition
              ${reserva.status === 'aprovado' ? 'border-green-300 bg-green-50' : ''}
              ${reserva.status === 'rejeitado' ? 'border-red-300 bg-red-50 opacity-60' : ''}
              ${reserva.status === 'pendente' ? 'border-gray-200' : ''}
            `}>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <i className="bi bi-person-fill text-blue-500 text-2xl" />
              </div>
              <span className="text-xs text-gray-500 font-medium">{reserva.matricula}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleRejeitar(reserva.id)}
                disabled={reserva.status !== 'pendente'}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm transition
                  ${reserva.status === 'rejeitado' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 active:scale-95'}
                `}
              >
                <i className="bi bi-x-lg text-xs" />
              </button>
              <button
                onClick={() => handleAprovar(reserva.id)}
                disabled={reserva.status !== 'pendente'}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm transition
                  ${reserva.status === 'aprovado' ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 active:scale-95'}
                `}
              >
                <i className="bi bi-check-lg text-xs" />
              </button>
            </div>

            {reserva.status !== 'pendente' && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                ${reserva.status === 'aprovado' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}
              `}>
                {reserva.status === 'aprovado' ? 'Aprovado' : 'Rejeitado'}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}