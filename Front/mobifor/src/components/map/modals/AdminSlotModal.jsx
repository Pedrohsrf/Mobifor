import { useState } from "react"
import { atualizarStatusVaga } from "../../../services/vagaService"

const STATUS = {
  disponivel: {
    label: "Disponível",
    bg: "#22c55e",
    light: "#f0fdf4",
    border: "#bbf7d0",
    text: "#15803d",
  },
  ocupada: {
    label: "Indisponível",
    bg: "#ef4444",
    light: "#fef2f2",
    border: "#fecaca",
    text: "#b91c1c",
  },
  reservada: {
    label: "Reservada",
    bg: "#3b82f6",
    light: "#eff6ff",
    border: "#bfdbfe",
    text: "#1d4ed8",
  },
}

function formatTipo(tipo) {
  const tipos = {
    carro: "Carro",
    carro_eletrico: "Carro elétrico",
    moto: "Moto",
    moto_eletrica: "Moto elétrica",
    Ônibus: "Ônibus",
  }

  return tipos[tipo] ?? tipo
}

export default function AdminSlotModal({ slot, onClose, onStatusUpdated }) {
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")
  const [mensagem, setMensagem] = useState("")

  if (!slot) return null

  const statusAtual = STATUS[slot.status] ?? STATUS.disponivel
  const codigo = slot.codigo ?? slot.id
  const tipo = formatTipo(slot.tipo ?? slot.type)
  const estacionamento = slot.estacionamento?.nome ?? "Estacionamento interno"

  async function handleAtualizarStatus(novoStatus) {
    try {
      setLoading(true)
      setErro("")
      setMensagem("")

      const vagaAtualizada = await atualizarStatusVaga(slot._id, novoStatus)

      onStatusUpdated(vagaAtualizada)

      setMensagem("Status da vaga atualizado com sucesso.")
    } catch (err) {
      setErro(err.message || "Erro ao atualizar status da vaga.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-20 rounded-2xl"
      style={{
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        background: "rgba(248, 250, 252, 0.38)",
      }}
      onClick={onClose}
    >
      <div
        className="bg-white relative flex flex-col items-center"
        style={{
          width: "460px",
          maxWidth: "92%",
          minHeight: "430px",
          padding: "34px 38px 32px",
          borderRadius: "30px",
          border: "1px solid rgba(226, 232, 240, 0.95)",
          boxShadow:
            "0 32px 80px rgba(15, 23, 42, 0.30), 0 12px 32px rgba(15, 23, 42, 0.16)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div
          className="rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${statusAtual.light} 0%, #ffffff 100%)`,
            border: `1.5px solid ${statusAtual.border}`,
            width: "122px",
            height: "110px",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 14px 30px rgba(15,23,42,0.10)",
          }}
        >
          <i
            className="bi bi-shield-lock-fill text-5xl"
            style={{ color: statusAtual.bg }}
          />
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">
            Painel administrativo
          </p>

          <h2 className="text-gray-800 text-3xl font-bold leading-tight">
            Vaga {codigo}
          </h2>

          <p className="text-gray-500 text-sm font-medium mt-2">
            {estacionamento} • {tipo}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <span
            className="text-sm font-bold px-5 py-2 rounded-full"
            style={{
              background: statusAtual.light,
              color: statusAtual.text,
              border: `1px solid ${statusAtual.border}`,
            }}
          >
            Status atual: {statusAtual.label}
          </span>
        </div>

        <div className="w-full space-y-3 mt-auto">
          {slot.status === "reservada" && (
            <div className="rounded-2xl px-4 py-3 text-center text-sm font-bold bg-blue-50 text-blue-600 border border-blue-200">
              Esta vaga está reservada por solicitação aprovada. Para liberar, marque como disponível.
            </div>
          )}

          {mensagem && (
            <div className="rounded-2xl px-4 py-3 text-center text-sm font-bold bg-green-50 text-green-600 border border-green-200">
              {mensagem}
            </div>
          )}

          {erro && (
            <div className="rounded-2xl px-4 py-3 text-center text-sm font-bold bg-red-50 text-red-500 border border-red-200">
              {erro}
            </div>
          )}

          <button
            onClick={() => handleAtualizarStatus("disponivel")}
            disabled={loading || slot.status === "disponivel"}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-2xl active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            Marcar como DISPONÍVEL
          </button>

          <button
            onClick={() => handleAtualizarStatus("ocupada")}
            disabled={loading || slot.status === "ocupada"}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-2xl active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            Marcar como INDISPONÍVEL
          </button>
        </div>
      </div>
    </div>
  )
}