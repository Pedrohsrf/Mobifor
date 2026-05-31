import { useEffect, useState } from "react"

import { obterMobistats } from "../../services/mobistatsService"

export default function MobistatsSection() {

  const [stats, setStats] = useState(null)

  const [loading, setLoading] = useState(true)

  async function carregarStats() {
    try {

      const data = await obterMobistats()

      setStats(data)

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    carregarStats()

    const intervalo = setInterval(() => {
      carregarStats()
    }, 3000)

    return () => clearInterval(intervalo)

  }, [])

  if (loading) {
    return (
      <div className="text-center py-10 font-bold text-blue-500">
        Carregando Mobistats...
      </div>
    )
  }

  return (
    <section
      id="mobistats"
      className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-10"
    >
      <div className="border-2 border-blue-300 rounded-2xl bg-gradient-to-b from-blue-50 to-gray-100 p-8 shadow-md">

        <h2 className="text-center text-3xl font-bold text-blue-600 mb-8 tracking-wide">
          MOBISTATS
        </h2>

        <div className="grid grid-cols-4 gap-5 mb-5">

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Vagas livres
            </p>

            <p className="text-4xl font-bold text-green-500">
              {stats.vagasDisponiveis}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Taxa disponível
            </p>

            <p className="text-4xl font-bold text-green-500">
              {stats.taxaDisponivel}%
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Vagas indisponíveis e reservadas
            </p>

            <p className="text-4xl font-bold text-red-500">
              {stats.vagasIndisponiveis}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Taxa indisponível
            </p>

            <p className="text-4xl font-bold text-red-500">
              {stats.taxaIndisponivel}%
            </p>
          </div>

        </div>

        <div className="border-t border-blue-200 my-6" />

        <div className="grid grid-cols-4 gap-5">

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Mais vagas
            </p>

            <p className="text-2xl font-bold text-green-500">
              {stats.estacionamentoMaisVagas}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Vagas {stats.estacionamentoMaisVagas}
            </p>

            <p className="text-4xl font-bold text-green-500">
              {stats.maiorQtd}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Menos vagas
            </p>

            <p className="text-2xl font-bold text-red-500">
              {stats.estacionamentoMenosVagas}
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Vagas {stats.estacionamentoMenosVagas}
            </p>

            <p className="text-4xl font-bold text-red-500">
              {stats.menorQtd}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}