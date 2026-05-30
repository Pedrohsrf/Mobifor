import { useState } from "react";
import { solicitarReserva } from "../../../services/reservaService";

const STATUS = {
  disponivel: {
    label: "Disponível",
    bg: "#22c55e",
    light: "#f0fdf4",
    border: "#bbf7d0",
    text: "#15803d",
    btn: "bg-green-500 hover:bg-green-600",
  },
  ocupada: {
    label: "Ocupada",
    bg: "#ef4444",
    light: "#fef2f2",
    border: "#fecaca",
    text: "#b91c1c",
    btn: null,
  },
  reservada: {
    label: "Reservada",
    bg: "#3b82f6",
    light: "#eff6ff",
    border: "#bfdbfe",
    text: "#1d4ed8",
    btn: null,
  },
};

function formatTipo(tipo) {
  const tipos = {
    carro: "Carro",
    carro_eletrico: "Carro elétrico",
    moto: "Moto",
    moto_eletrica: "Moto elétrica",
    Ônibus: "Ônibus",
  };

  return tipos[tipo] ?? tipo;
}

function IconCar({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12"
    >
      <path d="M5 13l1.5-4.5A2.2 2.2 0 0 1 8.6 7h6.8a2.2 2.2 0 0 1 2.1 1.5L19 13" />
      <path d="M4.5 13h15a1.5 1.5 0 0 1 1.5 1.5V18a1 1 0 0 1-1 1h-1.2" />
      <path d="M5.2 19H4a1 1 0 0 1-1-1v-3.5A1.5 1.5 0 0 1 4.5 13" />
      <path d="M7 19h10" />
      <circle cx="7.5" cy="18.5" r="1.8" />
      <circle cx="16.5" cy="18.5" r="1.8" />
      <path d="M7.5 10h9" />
    </svg>
  );
}

function IconMoto({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12"
    >
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17h3.5l2.5-6h3l3 6" />
      <path d="M12 11h-2" />
      <path d="M15 11l1.5-3H19" />
      <path d="M11 17h3" />
    </svg>
  );
}

function IconBus({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12"
    >
      <rect x="5" y="4" width="14" height="14" rx="2.5" />
      <path d="M8 4v14" />
      <path d="M16 4v14" />
      <path d="M5 10h14" />
      <path d="M5 14h14" />
      <circle cx="8" cy="20" r="1" fill={color} />
      <circle cx="16" cy="20" r="1" fill={color} />
    </svg>
  );
}

export default function SlotModal({ slot, onClose }) {
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  if (!slot) return null;

  const s = STATUS[slot.status] ?? STATUS.disponivel;

  const Icon =
    slot.tipo === "Ônibus" || slot.type === "Ônibus"
      ? IconBus
      : slot.tipo === "moto" || slot.tipo === "moto_eletrica"
      ? IconMoto
      : IconCar;

  const codigo = slot.codigo ?? slot.id;
  const tipo = formatTipo(slot.tipo ?? slot.type);
  const estacionamento = slot.estacionamento?.nome ?? "Estacionamento interno";

  async function handleSolicitarReserva() {
    try {
      setLoading(true);
      setErro("");
      setMensagem("");

      await solicitarReserva(slot._id);

      setMensagem("Solicitação enviada para aprovação do administrador.");
    } catch (err) {
      setErro(err.message || "Erro ao solicitar reserva.");
    } finally {
      setLoading(false);
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
          width: "420px",
          maxWidth: "92%",
          minHeight: "380px",
          maxHeight: "430px",
          padding: "26px 34px 26px",
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
          className="rounded-3xl flex items-center justify-center mb-5"
          style={{
            background: `linear-gradient(135deg, ${s.light} 0%, #ffffff 100%)`,
            border: `1.5px solid ${s.border}`,
            width: "104px",
            height: "92px",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 14px 30px rgba(15,23,42,0.10)",
          }}
        >
          <Icon color={s.bg} />
        </div>

        <div className="text-center mb-5">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">
            {estacionamento}
          </p>

          <h2 className="text-gray-800 text-2xl font-bold leading-tight">
            Vaga {codigo}
          </h2>

          <p className="text-gray-500 text-sm font-medium mt-2">{tipo}</p>
        </div>

        <div className="flex justify-center mb-5">
          <span
            className="text-sm font-bold px-5 py-2 rounded-full"
            style={{
              background: s.light,
              color: s.text,
              border: `1px solid ${s.border}`,
            }}
          >
            {s.label}
          </span>
        </div>

        <div className="w-full mt-auto">
          {slot.isBusStop && (
            <div
              className="rounded-2xl px-4 py-3 text-center text-sm font-bold"
              style={{
                background: "#eff6ff",
                color: "#1d4ed8",
                border: "1px solid #bfdbfe",
              }}
            >
              Ponto do UniBus: {slot.label}
            </div>
          )}

          {!slot.isBusStop && slot.status === "disponivel" && (
            <div className="space-y-3">

              {mensagem && (
                <div className="rounded-2xl px-4 py-2.5 text-center text-sm font-bold bg-green-50 text-green-600 border border-green-200">
                  {mensagem}
                </div>
              )}

              {erro && (
                <div className="rounded-2xl px-4 py-2.5 text-center text-sm font-bold bg-red-50 text-red-500 border border-red-200">
                  {erro}
                </div>
              )}

              <button
                onClick={handleSolicitarReserva}
                disabled={loading || !!mensagem}
                className={`w-full ${s.btn} text-white text-sm font-bold py-3 rounded-2xl active:scale-95 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {loading
                  ? "Enviando..."
                  : mensagem
                  ? "Solicitação enviada"
                  : "Solicitar reserva"}
              </button>
            </div>
          )}

          {!slot.isBusStop && slot.status === "ocupada" && (
            <div
              className="rounded-2xl px-4 py-3 text-center text-sm font-bold"
              style={{
                background: s.light,
                color: s.text,
                border: `1px solid ${s.border}`,
              }}
            >
              Esta vaga está ocupada no momento.
            </div>
          )}

          {!slot.isBusStop && slot.status === "reservada" && (
            <div
              className="rounded-2xl px-4 py-3 text-center text-sm font-bold"
              style={{
                background: s.light,
                color: s.text,
                border: `1px solid ${s.border}`,
              }}
            >
              Esta vaga já está reservada.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}