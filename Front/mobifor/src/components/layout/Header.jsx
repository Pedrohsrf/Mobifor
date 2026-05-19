import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const isLogin = location.pathname === '/'
  const isHome = location.pathname === '/home'


  return (
    <header className="relative w-full bg-white px-8 py-6 shadow-md border-b border-blue-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center ml-10">
          <img src="/logo_unifor.png" alt="Unifor" className="w-32 h-auto" />
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-blue-600 tracking-wide">
          MOBIFOR
        </h1>

        {isLogin && (
          <button
            type="button"
            onClick={() => navigate('/cadastro')}
            className="absolute right-10 top-1/2 -translate-y-1/2 h-11 px-6 rounded-lg bg-blue-600 text-white text-base font-bold transition hover:bg-blue-700"
          >
            Criar conta
          </button>
        )}

        {isHome && (
          <nav className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-6 mr-10">
            <button
            onClick={() => {
              document.getElementById('mobistats').scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-blue-600 font-bold text-sm tracking-wide hover:text-blue-800 transition"
          >
            MOBISTATS
          </button>
          <button
            onClick={() => {
              document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-blue-600 font-bold text-sm tracking-wide hover:text-blue-800 transition"
          >
            FAQ
          </button>
        </nav>
          )}
      </div>
    </header>
  )
}