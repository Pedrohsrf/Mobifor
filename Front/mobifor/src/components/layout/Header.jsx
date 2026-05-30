import { useNavigate, useLocation } from 'react-router-dom'
import { removerLogin } from '../../utils/authStorage'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const isLogin = location.pathname === '/' || location.pathname === '/login'
  const isHome = location.pathname === '/home'
  const isAdmin = location.pathname === '/admin'

  const smoothScrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    const targetY = el.getBoundingClientRect().top + window.scrollY
    const startY = window.scrollY
    const diff = targetY - startY
    const duration = 800
    let startTime = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      const ease =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

      window.scrollTo(0, startY + diff * ease)

      if (elapsed < duration) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }

  const handleLogout = () => {
    const confirmar = window.confirm('Deseja realmente sair da sua conta?')

    if (!confirmar) return

    removerLogin()
    navigate('/login')
  }

  return (
    <header className="relative w-full bg-white/90 backdrop-blur-md px-8 py-5 shadow-sm border-b border-blue-100">
      <div className="flex items-center gap-3">
        <div className="flex items-center ml-10">
          <img src="/logo_unifor.png" alt="Unifor" className="w-32 h-auto" />
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-blue-600">
          MOBIFOR
        </h1>

        {isLogin && (
          <button
            type="button"
            onClick={() => navigate('/cadastro')}
            className="absolute right-10 top-1/2 -translate-y-1/2 h-11 px-6 rounded-xl bg-blue-600 text-white text-base font-bold shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          >
            Criar conta
          </button>
        )}

        {isHome && (
          <nav className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-3 mr-10">
            <button
              onClick={() => smoothScrollTo('mobistats')}
              className="px-4 py-2 rounded-xl text-blue-600 font-bold text-base tracking-wide hover:bg-blue-50 hover:text-blue-800 transition"
            >
              MOBISTATS
            </button>

            <button
              onClick={() => smoothScrollTo('faq')}
              className="px-4 py-2 rounded-xl text-blue-600 font-bold text-base tracking-wide hover:bg-blue-50 hover:text-blue-800 transition"
            >
              FAQ
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-blue-600 font-bold text-base tracking-wide hover:bg-red-50 hover:text-red-500 transition"
            >
              SAIR
            </button>
          </nav>
        )}

        {isAdmin && (
          <nav className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-3 mr-10">
            <button
              onClick={() => smoothScrollTo('Gerenciamento')}
              className="px-4 py-2 rounded-xl text-blue-600 font-bold text-base tracking-wide hover:bg-blue-50 hover:text-blue-800 transition"
            >
              GERENCIAR
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-blue-600 font-bold text-base tracking-wide hover:bg-red-50 hover:text-red-500 transition"
            >
              SAIR
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}