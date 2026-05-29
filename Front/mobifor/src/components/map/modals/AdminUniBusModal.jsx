import { useState } from "react"

import { atualizarOnibus } from "../../../services/onibusServices"

function IconBus({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-14 h-14"
    >
      <rect x="5" y="4" width="14" height="14" rx="2.5" />
      <path d="M8 4v14" />
      <path d="M16 4v14" />
      <path d="M5 10h14" />
      <path d="M5 14h14" />
      <circle cx="8" cy="20" r="1" fill={color} />
      <circle cx="16" cy="20" r="1" fill={color} />
    </svg>
  )
}

export default function AdminUniBusModal({
  bus,
  onClose,
  onBusUpdated,
}) {

    if (!bus) return null

  const [numero, setNumero] = useState(bus.numero)

  const [pontosPassagem, setPontosPassagem] = useState(
    bus.pontos_passagem.join(", ")
  )

  const [terminalChegada, setTerminalChegada] = useState(
    bus.terminal_chegada
  )

  const [status, setStatus] = useState(bus.status)

  const [loading, setLoading] = useState(false)

  const [mensagem, setMensagem] = useState("")

  const [erro, setErro] = useState("")

  async function handleSalvar() {
    try {

      setLoading(true)

      setErro("")

      setMensagem("")

      const busAtualizado = await atualizarOnibus(bus._id, {
        numero,
        pontos_passagem: pontosPassagem
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),

        terminal_chegada: terminalChegada,

        status
      })

      onBusUpdated(busAtualizado)

      setMensagem("Ônibus atualizado com sucesso.")

      setTimeout(() => {
        onClose()
      }, 1500)

    } catch (err) {

      setErro(err.message || "Erro ao atualizar ônibus.")

    } finally {

      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-20 rounded-2xl"
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
          width: "500px",
          maxWidth: "94%",
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
          ✕
        </button>

        <div
          className="rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)",
            border: "1.5px solid #bfdbfe",
            width: "122px",
            height: "110px",
          }}
        >
          <IconBus color="#3b82f6" />
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">
            Gerenciamento
          </p>

          <h2 className="text-gray-800 text-3xl font-bold">
            UniBus
          </h2>
        </div>

        <div className="w-full space-y-4">

          <div>
            <label className="text-sm font-bold text-gray-600">
              Número
            </label>

            <input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">
              Ponto de partida
            </label>

            <input
              value={bus.ponto_partida}
              disabled
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 bg-gray-100 text-gray-500"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">
              Pontos de passagem
            </label>

            <textarea
              value={pontosPassagem}
              onChange={(e) => setPontosPassagem(e.target.value)}
              rows={3}
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">
              Terminal de chegada
            </label>

            <input
              value={terminalChegada}
              onChange={(e) => setTerminalChegada(e.target.value)}
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-600">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mt-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-400"
            >
              <option value="ativo">
                Ativo
              </option>

              <option value="inativo">
                Inativo
              </option>
            </select>
          </div>

          {mensagem && (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm font-bold text-green-600">
              {mensagem}
            </div>
          )}

          {erro && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-bold text-red-500">
              {erro}
            </div>
          )}

          <button
            onClick={handleSalvar}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-3.5 rounded-2xl active:scale-95 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {loading
              ? "Salvando..."
              : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  )
}