const STATUS = {
  free:     { label: "Disponível", bg: "bg-green-500",  ring: "ring-green-200",  textColor: "text-green-600",  hex: "#22c55e", borderHex: "#15803d" },
  occupied: { label: "Ocupada",    bg: "bg-red-500",    ring: "ring-red-200",    textColor: "text-red-600",    hex: "#ef4444", borderHex: "#b91c1c" },
  reserved: { label: "Reservada",  bg: "bg-blue-500",   ring: "ring-blue-200",   textColor: "text-blue-600",   hex: "#3b82f6", borderHex: "#1d4ed8" },
}

export default function SlotModal({ slot, onClose }) {
  if (!slot) return null
  const s = STATUS[slot.status]

  return (
    <div
      className="absolute inset-0 bg-black/30 flex items-center justify-center z-20 rounded-2xl"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-60 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 text-base leading-none transition-colors"
        >✕</button>

        <p className="text-center font-semibold text-gray-700 text-sm mb-0.5">
          Estacionamento interno
        </p>
        <p className="text-center text-gray-400 text-xs mb-4">
          Vaga {slot.id} — {slot.type}
        </p>

        {/* Ilustração do veículo */}
        <div
          className={`rounded-xl p-4 flex items-center justify-center mb-4 ring-2 ${s.ring}`}
          style={{ background: s.hex + "15" }}
        >
          {slot.type === "Carro" ? (
            <svg viewBox="0 0 80 44" className="w-24 h-14" fill="none">
              <rect x="5" y="18" width="70" height="22" rx="6" fill={s.hex} />
              <path d="M14 18 L22 6 H58 L66 18" fill={s.hex} />
              <rect x="20" y="8"  width="16" height="9" rx="2" fill="white" opacity="0.45" />
              <rect x="44" y="8"  width="16" height="9" rx="2" fill="white" opacity="0.45" />
              <line x1="5" y1="26" x2="75" y2="26" stroke="white" strokeWidth="0.8" strokeOpacity="0.25" />
              <circle cx="20" cy="40" r="5" fill={s.borderHex} />
              <circle cx="20" cy="40" r="2.5" fill="#f8fafc" />
              <circle cx="60" cy="40" r="5" fill={s.borderHex} />
              <circle cx="60" cy="40" r="2.5" fill="#f8fafc" />
            </svg>
          ) : (
            <svg viewBox="0 0 80 44" className="w-24 h-14" fill="none">
              <circle cx="18" cy="32" r="9"  fill="none" stroke={s.hex} strokeWidth="3.5" />
              <circle cx="62" cy="32" r="9"  fill="none" stroke={s.hex} strokeWidth="3.5" />
              <path d="M18 32 Q40 10 62 32" fill="none" stroke={s.hex} strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="40" cy="16" r="5" fill={s.hex} />
              <rect x="34" y="12" width="12" height="5" rx="2" fill={s.hex} />
            </svg>
          )}
        </div>

        <div className="flex justify-center mb-4">
          <span className={`${s.bg} text-white text-xs font-medium px-4 py-1 rounded-full`}>
            {s.label}
          </span>
        </div>

        {slot.status === "free" && (
          <>
            <p className="text-xs text-gray-400 text-center mb-3">Nenhum horário escolhido.</p>
            <button className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-medium py-2.5 rounded-full transition-all">
              Reservar
            </button>
          </>
        )}
        {slot.status === "occupied" && (
          <p className={`text-xs text-center font-medium ${s.textColor}`}>
            Vaga indisponível no momento.
          </p>
        )}
        {slot.status === "reserved" && (
          <p className={`text-xs text-center font-medium ${s.textColor}`}>
            Esta vaga já está reservada.
          </p>
        )}
      </div>
    </div>
  )
}