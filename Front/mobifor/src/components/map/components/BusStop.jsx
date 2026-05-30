export default function BusStop({ stop, onClick }) {
  return (
    <g
      transform={`translate(${stop.x},${stop.y})`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <circle r="9" fill="#eff6ff" />
      <circle r="9" fill="white" opacity="0.35" />
      <circle r="9" fill="none" stroke="#bfdbfe" strokeWidth="1.2" />

      <foreignObject x="-7" y="-8" width="14" height="14">
        <div className="w-[14px] h-[14px] flex items-center justify-center">
          <i className="bi bi-bus-front text-blue-600 text-sm leading-none"></i>
        </div>
      </foreignObject>
    </g>
  )
}