export default function MapLegend() {
  return (
    <div className="flex justify-between items-start mt-3 px-4 ml-40">
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        <LegendItem color="bg-green-500" label="Disponível" />
        <LegendItem color="bg-red-500" label="Ocupada" />
        <LegendItem color="bg-blue-500" label="Reservada" />

        <div className="flex items-center gap-2">
          <i className="bi bi-bus-front text-blue-600 text-lg"></i>
          <span className="text-sm font-bold">UniBus</span>
        </div>
      </div>

      <p className="text-sm text-blue-500 font-bold italic text-right mr-38">
        Vagas dinâmicas: atualização de disponibilidade constante.
      </p>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 ${color} inline-block rounded-sm`}></span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  )
}