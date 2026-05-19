export default function ParkingStatusSection() {
  return (
      <section id="mobistats" className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-60" max-w-4xl>
      <div className="border-2 border-blue-300 rounded-2xl bg-gradient-to-b from-blue-50 to-gray-100 p-8 shadow-md">
        <h2 className="text-center text-3xl font-bold text-blue-600 mb-8 tracking-wide">
          MOBISTATS
        </h2>

        <div className="grid grid-cols-4 gap-5 mb-5">
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Vagas livres</p>
            <p className="text-4xl font-bold text-green-500">389</p>
          </div>
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Taxa disponível</p>
            <p className="text-4xl font-bold text-green-500">29,8%</p>
          </div>
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Vagas ocupadas</p>
            <p className="text-4xl font-bold text-red-500">918</p>
          </div>
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Taxa indisponível</p>
            <p className="text-4xl font-bold text-red-500">70,2%</p>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-blue-200 my-6" />

        {/* Linha 2 */}
        <div className="grid grid-cols-4 gap-5">
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Mais vagas</p>
            <p className="text-2xl font-bold text-green-500">Est. interno</p>
          </div>
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Vagas setor</p>
            <p className="text-4xl font-bold text-green-500">126</p>
          </div>
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Menos vagas</p>
            <p className="text-2xl font-bold text-red-500">Est. externo</p>
          </div>
          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500 mb-2 font-medium">Vagas setor</p>
            <p className="text-4xl font-bold text-red-500">19</p>
          </div>
        </div>

      </div>
    </section>
  )
}