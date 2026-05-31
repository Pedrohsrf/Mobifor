import { useEffect, useState } from "react"

import UniBusModal from "./modals/UniBusModal"
import SlotModal from "./modals/SlotModal"
import AdminSlotModal from "./modals/AdminSlotModal"
import MapBackground from "./background/MapBackground"
import ParkingSlot from "./components/ParkingSlot"
import BusStop from "./components/BusStop"
import MapLegend from "./components/MapLegend"

import { BUS_STOPS } from "./constants/mapConstants"
import { useParkingMapControls } from "./hooks/useParkingMapControls"
import { listarVagas } from "../../services/vagaService"
import { buscarUsuario } from "../../utils/authStorage"
import { listarOnibus } from "../../services/onibusServices"

export default function ParkingMap({ refreshTrigger = 0 }) {
  const [selected, setSelected] = useState(null)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")
  const [onibus, setOnibus] = useState([])

  const usuario = buscarUsuario()
  const isAdmin = usuario?.tipo === "admin"

  const {
    transform,
    containerRef,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    zoomIn,
    zoomOut,
  } = useParkingMapControls()

  async function carregarDados() {
    try {
      const [vagasData, onibusData] = await Promise.all([
        listarVagas(),
        listarOnibus()
      ])

      setSlots(vagasData)
      setOnibus(onibusData)
      setErro("")

    } catch (err) {

      console.error(err)

      setErro("Erro ao carregar mapa.")
    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [refreshTrigger])

  useEffect(() => {
    const intervalo = setInterval(() => {
      carregarDados()
    }, 2000)

    return () => clearInterval(intervalo)
  }, [])

  const handleSlotClick = (slot, e) => {
    e.stopPropagation()
    setSelected(slot)
  }

  const handleBusClick = (bus, e) => {
    e.stopPropagation()

    setSelected({
      ...bus,
      isBusStop: true,
    })
  }

  const handleStatusUpdated = async (vagaAtualizada) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot._id === vagaAtualizada._id ? vagaAtualizada : slot
      )
    )

    setSelected(vagaAtualizada)

    await carregarDados()
  }

  return (
    <div className="space-y-5">
      <div
        ref={containerRef}
        className="relative mx-auto overflow-hidden select-none"
        style={{
          width: "78%",
          maxWidth: "1120px",
          height: "480px",
          borderRadius: "24px",
          border: "2px solid #93c5fd",
          background:
            "linear-gradient(135deg, #f8fbff 0%, #eef6ff 45%, #f8fafc 100%)",
          cursor: "grab",
          boxShadow: "0 16px 35px rgba(15, 23, 42, 0.08)",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0 }}
        >
          <g
            transform={`translate(${transform.x},${transform.y}) scale(${transform.scale})`}
          >
            <g opacity="0.95">
              <MapBackground />
            </g>

            <rect
              x="-1000"
              y="-1000"
              width="3000"
              height="3000"
              fill="#eaf4ff"
              opacity="0.16"
              pointerEvents="none"
            />

            {slots.map((slot) => (
              <ParkingSlot
                key={slot._id}
                slot={slot}
                onClick={(e) => handleSlotClick(slot, e)}
              />
            ))}

            {onibus.map((bus, index) => (
              <BusStop
                key={bus._id}
                stop={{
                  id: bus._id,
                  x: BUS_STOPS[index]?.x ?? 100,
                  y: BUS_STOPS[index]?.y ?? 100,
                  label: `UniBus ${bus.numero}`
                }}
                onClick={(e) => handleBusClick(bus, e)}
              />
            ))}
          </g>
        </svg>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-white/90 border border-blue-100 rounded-2xl px-5 py-3 shadow-sm text-sm font-bold text-blue-600">
              Carregando vagas...
            </div>
          </div>
        )}

        {erro && !loading && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-3 shadow-sm text-sm font-bold text-red-600">
              {erro}
            </div>
          </div>
        )}

        {selected && !isAdmin && !selected.isBusStop && (
          <SlotModal
            slot={selected}
            onClose={() => setSelected(null)}
          />
        )}

        {selected && isAdmin && !selected.isBusStop && (
          <AdminSlotModal
            slot={selected}
            onClose={() => setSelected(null)}
            onStatusUpdated={handleStatusUpdated}
          />
        )}

        {selected && selected.isBusStop && (
          <UniBusModal
            bus={selected}
            onClose={() => setSelected(null)}
          />
        )}

        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={zoomIn}
            className="w-9 h-9 bg-white rounded-xl border border-blue-100 text-blue-600 hover:bg-blue-50 flex items-center justify-center shadow-sm text-base font-bold transition-colors"
          >
            ＋
          </button>

          <button
            onClick={zoomOut}
            className="w-9 h-9 bg-white rounded-xl border border-blue-100 text-blue-600 hover:bg-blue-50 flex items-center justify-center shadow-sm text-base font-bold transition-colors"
          >
            －
          </button>
        </div>
      </div>

      <MapLegend />
    </div>
  )
}