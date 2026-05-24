export default function BusStop({ stop, onClick }) {
  return (
    <g
      transform={`translate(${stop.x},${stop.y})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <circle r="10" fill="#6b7280" opacity="0.15" />
      <circle r="7" fill="#9ca3af" />
      <circle r="7" fill="none" stroke="#6b7280" strokeWidth="1" />

      <rect
        x="-4"
        y="-3.5"
        width="8"
        height="7"
        rx="1.5"
        fill="white"
        opacity="0.9"
      />

      <rect
        x="-3"
        y="-5"
        width="6"
        height="2"
        rx="0.8"
        fill="white"
        opacity="0.7"
      />

      <circle cx="-2" cy="4" r="1.2" fill="#6b7280" />
      <circle cx="2" cy="4" r="1.2" fill="#6b7280" />
    </g>
  )
}