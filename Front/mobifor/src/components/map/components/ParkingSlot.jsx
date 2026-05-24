import { SLOT_COLOR, SLOT_DARK } from "../constants/mapConstants"

export default function ParkingSlot({ slot, onClick }) {
  const W = 11
  const H = 9

  const fill = SLOT_COLOR[slot.status] ?? SLOT_COLOR.disponivel
  const dark = SLOT_DARK[slot.status] ?? SLOT_DARK.disponivel

  return (
    <g
      transform={`translate(${slot.x},${slot.y})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <rect
        x="0.8"
        y="0.8"
        width={W}
        height={H}
        rx="1.5"
        fill="rgba(0,0,0,0.18)"
      />

      <rect
        width={W}
        height={H}
        rx="1.5"
        fill={fill}
      />

      <rect
        width={W}
        height="2"
        rx="1"
        fill={dark}
        opacity="0.4"
      />

      <rect
        x="0"
        width="1.5"
        height={H}
        rx="0.5"
        fill={dark}
        opacity="0.35"
      />

      <rect
        x={W - 1.5}
        width="1.5"
        height={H}
        rx="0.5"
        fill={dark}
        opacity="0.35"
      />
    </g>
  )
}