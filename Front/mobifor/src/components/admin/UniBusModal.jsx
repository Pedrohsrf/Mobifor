function IconBus({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
      <rect x="5" y="4" width="14" height="14" rx="2.5" />
      <path d="M8 4v14M16 4v14M5 10h14M5 14h14" />
      <circle cx="8" cy="20" r="1" fill={color} />
      <circle cx="16" cy="20" r="1" fill={color} />
    </svg>
  )
}

export default function UniBusModal({ bus, onClose }) {
  if (!bus) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
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
          minHeight: '400px',
          padding: '34px 38px 32px',
          borderRadius: '30px',
          border: '1px solid rgba(226, 232, 240, 0.95)',
          boxShadow: '0 32px 80px rgba(15, 23, 42, 0.30), 0 12px 32px rgba(15, 23, 42, 0.16)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-50 border border-gray-100 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Ícone */}
        <div
          className="rounded-3xl flex items-center justify-center mb-6"
          style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
            border: '1.5px solid #bfdbfe',
            width: '122px',
            height: '110px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 14px 30px rgba(15,23,42,0.10)',
          }}
        >
          <IconBus color="#3b82f6" />
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">
            Gerenciamento
          </p>
          <h2 className="text-gray-800 text-3xl font-bold leading-tight">
            {bus.nome}
          </h2>
        </div>

        {/* Informações */}
        <div className="w-full space-y-3 mt-auto">
          <div
            className="rounded-2xl px-4 py-3 flex justify-between items-center text-sm font-medium"
            style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}
          >
            <span className="text-gray-400">Capacidade</span>
            <span className="text-gray-700 font-bold">48 passageiros</span>
          </div>
          <div
            className="rounded-2xl px-4 py-3 flex justify-between items-center text-sm font-medium"
            style={{ background: '#f8fafc', border: '1px solid #e5e7eb' }}
          >
            <span className="text-gray-400">Status</span>
            <span className="text-green-600 font-bold">Ativo</span>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-3.5 rounded-2xl active:scale-95 transition-all shadow-md hover:shadow-lg mt-2">
            Gerenciar {bus.nome}
          </button>
        </div>
      </div>
    </div>
  )
}