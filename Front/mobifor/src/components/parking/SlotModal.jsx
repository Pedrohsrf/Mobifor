const STATUS = {
  free: {
    label: "Disponível",
    bg: "#22c55e",
    light: "#f0fdf4",
    border: "#bbf7d0",
    text: "#15803d",
    btn: "bg-green-500 hover:bg-green-600",
  },
  occupied: {
    label: "Ocupada",
    bg: "#ef4444",
    light: "#fef2f2",
    border: "#fecaca",
    text: "#b91c1c",
    btn: null,
  },
  reserved: {
    label: "Reservada",
    bg: "#3b82f6",
    light: "#eff6ff",
    border: "#bfdbfe",
    text: "#1d4ed8",
    btn: null,
  },
}

// Ícones inline SVG com visual mais limpo
function IconCar({ color }) {
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
      <path d="M5 13l1.5-4.5A2.2 2.2 0 0 1 8.6 7h6.8a2.2 2.2 0 0 1 2.1 1.5L19 13" />
      <path d="M4.5 13h15a1.5 1.5 0 0 1 1.5 1.5V18a1 1 0 0 1-1 1h-1.2" />
      <path d="M5.2 19H4a1 1 0 0 1-1-1v-3.5A1.5 1.5 0 0 1 4.5 13" />
      <path d="M7 19h10" />
      <circle cx="7.5" cy="18.5" r="1.8" />
      <circle cx="16.5" cy="18.5" r="1.8" />
      <path d="M7.5 10h9" />
    </svg>
  )
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
      className="w-14 h-14"
    >
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M6 17h3.5l2.5-6h3l3 6" />
      <path d="M12 11h-2" />
      <path d="M15 11l1.5-3H19" />
      <path d="M11 17h3" />
    </svg>
  )
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

export default function SlotModal({ slot, onClose }) {
  if (!slot) return null
  const s = STATUS[slot.status] ?? STATUS.free

  const Icon = slot.type === "Ônibus"
    ? IconBus
    : slot.type === "Moto"
    ? IconMoto
    : IconCar

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
        onClick={e => e.stopPropagation()}
      >
        {/* Fechar */}
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

        {/* Ícone superior centralizado */}
        <div
          className="rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${s.light} 0%, #ffffff 100%)`,
            border: `1.5px solid ${s.border}`,
            width: "122px",
            height: "110px",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.9), 0 14px 30px rgba(15,23,42,0.10)",
          }}
        >
          <Icon color={s.bg} />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">
            Estacionamento interno
          </p>

          <h2 className="text-gray-800 text-3xl font-bold leading-tight">
            Vaga {slot.id}
          </h2>

          <p className="text-gray-500 text-sm font-medium mt-2">
            {slot.type}
          </p>
        </div>

        {/* Status */}
        <div className="flex justify-center mb-7">
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

        {/* Ação */}
        <div className="w-full mt-auto">
          {slot.status === "free" && (
            <div className="space-y-3">
              <div
                className="rounded-2xl px-4 py-3 text-center text-sm text-gray-500 font-medium"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e5e7eb",
                }}
              >
                Nenhum horário escolhido.
              </div>

              <button
                className={`w-full ${s.btn} text-white text-sm font-bold py-3.5 rounded-2xl active:scale-95 transition-all shadow-md hover:shadow-lg`}
              >
                Reservar vaga
              </button>
            </div>
          )}

          {slot.status === "occupied" && (
            <div
              className="rounded-2xl px-4 py-3.5 text-center text-sm font-bold"
              style={{
                background: s.light,
                color: s.text,
                border: `1px solid ${s.border}`,
              }}
            >
              Esta vaga está ocupada no momento.
            </div>
          )}

          {slot.status === "reserved" && (
            <div
              className="rounded-2xl px-4 py-3.5 text-center text-sm font-bold"
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
  )
}