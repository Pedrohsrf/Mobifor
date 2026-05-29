export default function UniBusModal({ bus, onClose }) {
  if (!bus) return null

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-20 rounded-2xl"
      style={{
        backdropFilter: 'blur(7px)',
        WebkitBackdropFilter: 'blur(7px)',
        background: 'rgba(248, 250, 252, 0.38)',
      }}
      onClick={onClose}
    >
      <div
        className="bg-white relative flex flex-col items-center"
        style={{
          width: '460px',
          maxWidth: '92%',
          minHeight: '430px',
          padding: '34px 38px 32px',
          borderRadius: '30px',
          border: '1px solid rgba(226, 232, 240, 0.95)',
          boxShadow:
            '0 32px 80px rgba(15, 23, 42, 0.30), 0 12px 32px rgba(15, 23, 42, 0.16)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-center"
        >
          ✕
        </button>

        <div className="w-24 h-24 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-6">
          <i className="bi bi-bus-front text-5xl text-blue-500"></i>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">
            Transporte universitário
          </p>

          <h2 className="text-gray-800 text-3xl font-bold">
            UniBus {bus.numero}
          </h2>
        </div>

        <div className="w-full space-y-3">
          <InfoItem
            label="Ponto de partida"
            value={bus.ponto_partida}
          />

          <InfoItem
            label="Terminal de chegada"
            value={bus.terminal_chegada}
          />

          <InfoItem
            label="Status"
            value={bus.status}
          />

          <div className="rounded-2xl p-4 border border-gray-200 bg-gray-50">
            <p className="text-sm font-bold text-gray-600 mb-2">
              Pontos de passagem
            </p>

            <div className="flex flex-wrap gap-2">
              {bus.pontos_passagem?.map((ponto, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold"
                >
                  {ponto}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl px-4 py-3 flex justify-between items-center bg-gray-50 border border-gray-200">
      <span className="text-gray-400 text-sm font-medium">
        {label}
      </span>

      <span className="text-gray-700 text-sm font-bold">
        {value}
      </span>
    </div>
  )
}