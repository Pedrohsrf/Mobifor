import { useState, useRef, useCallback } from "react"
import SlotModal    from "../parking/SlotModal"
import MapBackground from "../parking/MapBackground"

// Vagas verticais (W=22, H=38) — posicionadas em colunas
const SLOTS = [
  // Setor A — 2 fileiras de 3
  { id: "A01", x: 40,  y: 70,  status: "free",     sector: "A", type: "Carro" },
  { id: "A02", x: 40,  y: 116, status: "free",     sector: "A", type: "Carro" },
  { id: "A03", x: 40,  y: 162, status: "occupied",  sector: "A", type: "Carro" },
  { id: "A04", x: 80,  y: 70,  status: "free",     sector: "A", type: "Carro" },
  { id: "A05", x: 80,  y: 116, status: "reserved",  sector: "A", type: "Carro" },
  { id: "A06", x: 80,  y: 162, status: "free",     sector: "A", type: "Carro" },

  // Setor B — 2 fileiras de 3
  { id: "B01", x: 330, y: 70,  status: "occupied",  sector: "B", type: "Carro" },
  { id: "B02", x: 330, y: 116, status: "free",     sector: "B", type: "Carro" },
  { id: "B03", x: 330, y: 162, status: "free",     sector: "B", type: "Carro" },
  { id: "B04", x: 374, y: 70,  status: "free",     sector: "B", type: "Carro" },
  { id: "B05", x: 374, y: 116, status: "occupied",  sector: "B", type: "Carro" },
  { id: "B06", x: 374, y: 162, status: "reserved",  sector: "B", type: "Carro" },

  // Setor C — motos (menores)
  { id: "C01", x: 40,  y: 258, status: "free",     sector: "C", type: "Moto" },
  { id: "C02", x: 40,  y: 304, status: "free",     sector: "C", type: "Moto" },
  { id: "C03", x: 40,  y: 350, status: "occupied",  sector: "C", type: "Moto" },
  { id: "C04", x: 80,  y: 258, status: "reserved",  sector: "C", type: "Moto" },
  { id: "C05", x: 80,  y: 304, status: "free",     sector: "C", type: "Moto" },

  // Setor D
  { id: "D01", x: 330, y: 258, status: "free",     sector: "D", type: "Carro" },
  { id: "D02", x: 330, y: 304, status: "occupied",  sector: "D", type: "Carro" },
  { id: "D03", x: 330, y: 350, status: "free",     sector: "D", type: "Carro" },
  { id: "D04", x: 374, y: 258, status: "free",     sector: "D", type: "Carro" },
  { id: "D05", x: 374, y: 304, status: "reserved",  sector: "D", type: "Carro" },
]

const CFG = {
  free:     { fill: "#22c55e", dark: "#15803d", light: "#bbf7d0" },
  occupied: { fill: "#ef4444", dark: "#b91c1c", light: "#fecaca" },
  reserved: { fill: "#3b82f6", dark: "#1d4ed8", light: "#bfdbfe" },
}

// Vaga vertical — retângulo alto com marcações de vaga real
function ParkingSlot({ slot, onClick }) {
  const W = 22, H = 38
  const c = CFG[slot.status]
  const isMoto = slot.type === "Moto"

  return (
    <g
      transform={`translate(${slot.x}, ${slot.y})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Sombra */}
      <rect x="1.5" y="1.5" width={W} height={H} rx="3" fill="rgba(0,0,0,0.20)" />

      {/* Corpo da vaga */}
      <rect width={W} height={H} rx="3" fill={c.fill} />

      {/* Topo mais escuro (calçada) */}
      <rect width={W} height="5" rx="2" fill={c.dark} opacity="0.55" />

      {/* Linhas laterais de demarcação */}
      <rect x="0"      y="0" width="2.5" height={H} rx="1" fill={c.dark} opacity="0.5" />
      <rect x={W-2.5}  y="0" width="2.5" height={H} rx="1" fill={c.dark} opacity="0.5" />

      {/* Ícone centralizado */}
      {isMoto ? (
        // Moto — silhueta simples vista de cima
        <g transform={`translate(${W/2 - 5}, ${H/2 - 8})`}>
          <ellipse cx="5" cy="3"  rx="3" ry="2" fill="white" opacity="0.85" />
          <rect    x="3" y="4"   width="4" height="8" rx="1" fill="white" opacity="0.85" />
          <ellipse cx="5" cy="14" rx="3" ry="2" fill="white" opacity="0.85" />
        </g>
      ) : (
        // Carro — silhueta vista de cima
        <g transform={`translate(${W/2 - 6}, ${H/2 - 10})`}>
          <rect x="1" y="4"  width="10" height="14" rx="2" fill="white" opacity="0.85" />
          <rect x="2" y="2"  width="8"  height="5"  rx="1" fill="white" opacity="0.6"  />
          <rect x="2" y="14" width="8"  height="4"  rx="1" fill="white" opacity="0.6"  />
          {/* rodas */}
          <rect x="0"  y="5"  width="2" height="4" rx="1" fill={c.dark} opacity="0.7" />
          <rect x="10" y="5"  width="2" height="4" rx="1" fill={c.dark} opacity="0.7" />
          <rect x="0"  y="13" width="2" height="4" rx="1" fill={c.dark} opacity="0.7" />
          <rect x="10" y="13" width="2" height="4" rx="1" fill={c.dark} opacity="0.7" />
        </g>
      )}

      {/* ID abaixo */}
      <text
        x={W / 2} y={H + 11}
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill="#4b5563"
        fontFamily="system-ui, sans-serif"
      >
        {slot.id}
      </text>
    </g>
  )
}

export default function ParkingMap() {
  const [selected, setSelected]   = useState(null)
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const isPanning  = useRef(false)
  const lastPos    = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    isPanning.current = true
    lastPos.current   = { x: e.clientX, y: e.clientY }
    e.currentTarget.style.cursor = "grabbing"
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!isPanning.current) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    lastPos.current = { x: e.clientX, y: e.clientY }
    setTransform(t => ({ ...t, x: t.x + dx, y: t.y + dy }))
  }, [])

  const onMouseUp = useCallback((e) => {
    isPanning.current = false
    e.currentTarget.style.cursor = "grab"
  }, [])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const rect  = containerRef.current.getBoundingClientRect()
    const mx    = e.clientX - rect.left
    const my    = e.clientY - rect.top
    const delta = e.deltaY < 0 ? 1.12 : 0.9
    setTransform(t => {
      const newScale = Math.min(Math.max(t.scale * delta, 0.35), 4)
      const ratio    = newScale / t.scale
      return { scale: newScale, x: mx - ratio * (mx - t.x), y: my - ratio * (my - t.y) }
    })
  }, [])

  const free     = SLOTS.filter(s => s.status === "free").length
  const occupied = SLOTS.filter(s => s.status === "occupied").length
  const reserved = SLOTS.filter(s => s.status === "reserved").length

  return (
    <div className="space-y-3">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-green-500 inline-block" />
            Disponível ({free})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block" />
            Ocupada ({occupied})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
            Reservada ({reserved})
          </span>
        </div>
        <button
          onClick={() => setTransform({ x: 0, y: 0, scale: 1 })}
          className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md px-2 py-1 transition-colors"
        >
          Resetar vista
        </button>
      </div>

      {/* Mapa */}
      <div
        ref={containerRef}
        className="relative w-3/4 mx-auto h-[460px] rounded-2xl border border-gray-200 overflow-hidden select-none"
        style={{ cursor: "grab", background: "#ede8df" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onWheel={onWheel}
      >
        {/* Hint */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <span className="text-[10px] text-stone-400 bg-white/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-sm">
            Arraste · Scroll para zoom
          </span>
        </div>

        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
            <MapBackground />
            {SLOTS.map(slot => (
              <ParkingSlot
                key={slot.id}
                slot={slot}
                onClick={e => { e.stopPropagation(); setSelected(slot) }}
              />
            ))}
          </g>
        </svg>

        {/* Modal */}
        {selected && (
          <SlotModal slot={selected} onClose={() => setSelected(null)} />
        )}

        {/* Botões zoom */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1 z-10">
          {["+", "−"].map((sym, i) => (
            <button
              key={sym}
              onClick={() => setTransform(t => ({
                ...t,
                scale: Math.min(Math.max(t.scale * (i === 0 ? 1.2 : 0.8), 0.35), 4)
              }))}
              className="w-7 h-7 bg-white rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center text-sm shadow-sm"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-blue-400 italic text-right">
        Vagas dinâmicas: atualização de disponibilidade constante.
      </p>
    </div>
  )
}