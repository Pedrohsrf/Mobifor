import { useState, useRef, useCallback, useEffect } from "react"
import SlotModal     from "../parking/SlotModal"
import MapBackground from "../parking/MapBackground"

// ── VAGAS — posicionadas conforme imagem real da Unifor ──────────────
// Grupo 1: Estacionamento noroeste (coluna de vagas perto do Teatro)
const makeColumn = (startX, startY, count, status, sector, type = "Carro", vertical = true) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${sector}${String(i + 1).padStart(2, "0")}`,
    x: vertical ? startX : startX + i * 14,
    y: vertical ? startY + i * 12 : startY,
    status: Array.isArray(status) ? status[i % status.length] : status,
    sector,
    type,
  }))

const SLOTS = [
  // Estac. Noroeste — coluna verde/vermelho (perto do Teatro)
  ...makeColumn(122, 98, 3, ["free","free","free"],         "NW1", "Carro", true),
  ...makeColumn(136, 98, 3, ["occupied","free","occupied"], "NW2", "Carro", true),

  // Estac. Noroeste 2ª coluna
  ...makeColumn(122, 138, 4, ["free","occupied","free","free"],           "NW3", "Carro", true),
  ...makeColumn(136, 138, 4, ["occupied","free","reserved","occupied"],   "NW4", "Carro", true),

  // Estac. Geral (topo direito) — grade grande, majoritariamente ocupado
  ...makeColumn(420, 42, 4, "occupied", "GA", "Carro", false),
  ...makeColumn(420, 54, 4, "occupied", "GB", "Carro", false),
  ...makeColumn(420, 66, 4, "occupied", "GC", "Carro", false),
  ...makeColumn(420, 78, 4, ["occupied","occupied","free","occupied"], "GD", "Carro", false),
  ...makeColumn(420, 90, 4, "occupied", "GE", "Carro", false),

  // Estac. Geral segundo bloco (direita)
  ...makeColumn(482, 42, 4, "occupied", "GF", "Carro", false),
  ...makeColumn(482, 54, 4, ["occupied","free","occupied","occupied"], "GG", "Carro", false),
  ...makeColumn(482, 66, 4, "occupied", "GH", "Carro", false),
  ...makeColumn(482, 78, 3, "occupied", "GI", "Carro", false),

  // Estac. Central (grande, topo centro-direita)
  ...makeColumn(310, 100, 6, "occupied", "CA", "Carro", false),
  ...makeColumn(310, 112, 6, "occupied", "CB", "Carro", false),
  ...makeColumn(310, 124, 6, ["occupied","free","occupied","occupied","free","occupied"], "CC", "Carro", false),
  ...makeColumn(310, 136, 6, "occupied", "CD", "Carro", false),
  ...makeColumn(310, 148, 5, "occupied", "CE", "Carro", false),
  ...makeColumn(310, 160, 5, ["free","occupied","occupied","free","occupied"], "CF", "Carro", false),

  // Estac. Bloco D (sudoeste, inclinado ~diagonal — simplificado em 2 colunas)
  ...makeColumn(42,  310, 5, ["free","reserved","occupied","free","free"],     "D1", "Carro", true),
  ...makeColumn(56,  310, 5, ["occupied","free","blue","free","reserved"],     "D2", "Carro", true),
  ...makeColumn(70,  310, 5, ["free","occupied","free","reserved","occupied"], "D3", "Carro", true),

  // Estac. Sul (perto do P sul)
  ...makeColumn(370, 340, 3, ["free","free","free"],               "S1", "Carro", false),
  ...makeColumn(370, 352, 3, ["occupied","free","free"],           "S2", "Carro", false),
  ...makeColumn(370, 364, 3, ["free","occupied","free"],           "S3", "Carro", false),
]

// Normaliza status inválidos
const VALID = ["free", "occupied", "reserved"]
const NORMALIZED = SLOTS.map(s => ({
  ...s,
  status: VALID.includes(s.status) ? s.status : "free",
}))

// Pontos de ônibus
const BUS_STOPS = [
  { id: "B1", x: 395, y: 45,  label: "Terminal Norte" },
  { id: "B2", x: 30,  y: 210, label: "Bloco D"        },
  { id: "B3", x: 500, y: 210, label: "Leste"          },
  { id: "B4", x: 270, y: 390, label: "Terminal Sul"   },
]

const SLOT_COLOR = {
  free:     "#22c55e",
  occupied: "#ef4444",
  reserved: "#3b82f6",
}
const SLOT_DARK = {
  free:     "#15803d",
  occupied: "#b91c1c",
  reserved: "#1d4ed8",
}

function ParkingSlot({ slot, onClick }) {
  const W = 11, H = 9
  const fill = SLOT_COLOR[slot.status]
  const dark = SLOT_DARK[slot.status]

  return (
    <g transform={`translate(${slot.x},${slot.y})`} onClick={onClick} style={{ cursor: "pointer" }}>
      <rect x="0.8" y="0.8" width={W} height={H} rx="1.5" fill="rgba(0,0,0,0.18)" />
      <rect width={W} height={H} rx="1.5" fill={fill} />
      <rect width={W} height="2" rx="1" fill={dark} opacity="0.4" />
      <rect x="0" width="1.5" height={H} rx="0.5" fill={dark} opacity="0.35" />
      <rect x={W - 1.5} width="1.5" height={H} rx="0.5" fill={dark} opacity="0.35" />
    </g>
  )
}

function BusStop({ stop, onClick }) {
  return (
    <g transform={`translate(${stop.x},${stop.y})`} onClick={onClick} style={{ cursor: "pointer" }}>
      <circle r="10" fill="#6b7280" opacity="0.15" />
      <circle r="7"  fill="#9ca3af" />
      <circle r="7"  fill="none" stroke="#6b7280" strokeWidth="1" />

      {/* ícone de ônibus simplificado */}
      <rect x="-4" y="-3.5" width="8" height="7" rx="1.5" fill="white" opacity="0.9" />
      <rect x="-3" y="-5"   width="6" height="2" rx="0.8" fill="white" opacity="0.7" />
      <circle cx="-2" cy="4" r="1.2" fill="#6b7280" />
      <circle cx="2"  cy="4" r="1.2" fill="#6b7280" />
    </g>
  )
}

export default function ParkingMap() {
  const [selected,   setSelected]   = useState(null)
  const [transform,  setTransform]  = useState({ x: 20, y: 10, scale: 1 })
  const isPanning    = useRef(false)
  const lastPos      = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const onMouseDown = useCallback((e) => {
    if (e.button !== 0) return

    isPanning.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.style.cursor = "grabbing"
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!isPanning.current) return

    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y

    lastPos.current = { x: e.clientX, y: e.clientY }

    setTransform(t => ({
      ...t,
      x: t.x + dx,
      y: t.y + dy,
    }))
  }, [])

  const onMouseUp = useCallback((e) => {
    isPanning.current = false
    e.currentTarget.style.cursor = "grab"
  }, [])

  // Zoom com scroll sem rolar a página externa
  const onWheel = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const normalizedDelta = Math.max(-1, Math.min(1, e.deltaY / 500))
    const zoomFactor = 1 - normalizedDelta * 0.08

    setTransform(t => {
      const newScale = Math.min(Math.max(t.scale * zoomFactor, 0.8), 2.1)
      const ratio = newScale / t.scale

      return {
        scale: newScale,
        x: mx - ratio * (mx - t.x),
        y: my - ratio * (my - t.y),
      }
    })
  }, [])

  useEffect(() => {
    const mapElement = containerRef.current

    if (!mapElement) return

    mapElement.addEventListener("wheel", onWheel, { passive: false })

    return () => {
      mapElement.removeEventListener("wheel", onWheel)
    }
  }, [onWheel])

  const zoomIn = () => {
    setTransform(t => ({
      ...t,
      scale: Math.min(t.scale * 1.05, 2.1),
    }))
  }

  const zoomOut = () => {
    setTransform(t => ({
      ...t,
      scale: Math.max(t.scale * 0.95, 0.8),
    }))
  }

  const handleBusClick = (stop, e) => {
    e.stopPropagation()
    setSelected({ id: stop.id, type: "Ônibus", status: "free", label: stop.label })
  }

  return (
    <div className="space-y-3">
      {/* Mapa com visual mais próximo de mapas digitais */}
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden select-none"
        style={{
          width: "70%",
          maxWidth: "1120px",
          height: "560px",
          borderRadius: "18px",
          border: "2px solid #60a5fa",
          background: "linear-gradient(135deg, #eef6ff 0%, #e5edf7 45%, #f8fafc 100%)",
          cursor: "grab",
          boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}>
            <g opacity="0.92">
              <MapBackground />
            </g>

            {/* Camada fria para reduzir o tom marrom e deixar mais parecido com mapa digital */}
            <rect
              x="-1000"
              y="-1000"
              width="3000"
              height="3000"
              fill="#eaf4ff"
              opacity="0.22"
              pointerEvents="none"
            />

            {/* Vagas */}
            {NORMALIZED.map(slot => (
              <ParkingSlot
                key={slot.id}
                slot={slot}
                onClick={e => { e.stopPropagation(); setSelected(slot) }}
              />
            ))}

            {/* Pontos de ônibus */}
            {BUS_STOPS.map(stop => (
              <BusStop
                key={stop.id}
                stop={stop}
                onClick={e => handleBusClick(stop, e)}
              />
            ))}
          </g>
        </svg>

        {/* Modal */}
        {selected && (
          <SlotModal slot={selected} onClose={() => setSelected(null)} />
        )}

        {/* Botões de zoom */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-10">
          {[["＋", zoomIn], ["－", zoomOut]].map(([sym, fn]) => (
            <button
              key={sym}
              onClick={fn}
              className="w-8 h-8 bg-white rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center shadow-sm text-base font-medium transition-colors"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      <p className="text-lg text-blue-500 text-right mr-60" style={{ fontWeight: 700, fontStyle: "italic" }}>
        Vagas dinâmicas: atualização de disponibilidade constante.
      </p>
    </div>
  )
}