import { useEffect, useState } from "react"

import { listarMinhasReservas } from "../../services/reservaService"

export default function MinhasReservasSection() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    carregarMinhasReservas()
  }, [])

  async function carregarMinhasReservas() {
    try {
      setLoading(true)
      setErro("")

      const data = await listarMinhasReservas()

      setReservas(data)
    } catch (err) {
      setErro(err.message || "Erro ao carregar suas reservas.")
    } finally {
      setLoading(false)
    }
  }

  function getCodigoVaga(vaga) {
    return vaga?.codigo || "Vaga"
  }

  function getEstacionamento(vaga) {
    return vaga?.estacionamento?.nome || "Estacionamento"
  }

  function getStatusInfo(status) {
    const statusInfo = {
      pendente: {
        label: "Pendente",
        text: "Aguardando validação do administrador.",
        icon: "bi-clock-fill",
        bg: "bg-blue-50",
        border: "border-blue-200",
        textColor: "text-blue-600",
      },
      aprovada: {
        label: "Aprovada",
        text: "Sua solicitação foi aprovada.",
        icon: "bi-check-circle-fill",
        bg: "bg-green-50",
        border: "border-green-200",
        textColor: "text-green-600",
      },
      rejeitada: {
        label: "Rejeitada",
        text: "Sua solicitação foi recusada.",
        icon: "bi-x-circle-fill",
        bg: "bg-red-50",
        border: "border-red-200",
        textColor: "text-red-500",
      },
      cancelada: {
        label: "Cancelada",
        text: "Esta solicitação foi cancelada.",
        icon: "bi-dash-circle-fill",
        bg: "bg-gray-50",
        border: "border-gray-200",
        textColor: "text-gray-500",
      },
    }

    return statusInfo[status] || statusInfo.pendente
  }

  if (loading) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6 mt-8">
        <p className="text-center text-sm font-semibold text-blue-500">
          Carregando suas solicitações...
        </p>
      </section>
    )
  }

  if (erro) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6 mt-8">
        <p className="text-center text-sm font-semibold text-red-500">
          {erro}
        </p>
      </section>
    )
  }

  if (reservas.length === 0) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Minhas solicitações
        </h2>

        <p className="text-sm font-medium text-gray-500">
          Você ainda não realizou nenhuma solicitação de reserva.
        </p>
      </section>
    )
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6 mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Minhas solicitações
        </h2>

        <p className="text-sm font-medium text-gray-500 mt-1">
          Acompanhe o status das suas reservas solicitadas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reservas.map((reserva) => {
          const status = getStatusInfo(reserva.status)

          return (
            <div
              key={reserva._id}
              className={`rounded-2xl border ${status.border} ${status.bg} p-4`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${status.textColor}`}>
                  <i className={`bi ${status.icon} text-xl`} />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {getCodigoVaga(reserva.vaga)}
                  </p>

                  <p className="text-xs font-medium text-gray-500 mt-0.5">
                    {getEstacionamento(reserva.vaga)}
                  </p>

                  <p className={`text-sm font-bold mt-2 ${status.textColor}`}>
                    {status.label}
                  </p>

                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {status.text}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}