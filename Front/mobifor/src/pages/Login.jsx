import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { loginUsuario } from "../services/authService"
import { salvarLogin, buscarToken, buscarUsuario } from "../utils/authStorage"

export default function Login() {
  const [matricula, setMatricula] = useState("")
  const [senha, setSenha] = useState("")
  const [permanecerConectado, setPermanecerConectado] = useState(false)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = buscarToken()
    const usuario = buscarUsuario()

    if (!token || !usuario) return

    if (usuario.tipo === "admin") {
      navigate("/admin", { replace: true })
    } else {
      navigate("/home", { replace: true })
    }
  }, [navigate])

  async function handleLogin(event) {
    event.preventDefault()

    setErro("")
    setLoading(true)

    try {
      const data = await loginUsuario(matricula, senha)

      salvarLogin(data.token, data.usuario, permanecerConectado)

      if (data.usuario?.tipo === "admin") {
        navigate("/admin")
      } else {
        navigate("/home")
      }
    } catch (error) {
      setErro(error.message || "Não foi possível conectar ao servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-128px)] items-center justify-center overflow-hidden bg-blue-50">
      <div className="relative z-10 mx-auto flex w-[50%] max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-[0_25px_80px_rgba(0,0,0,0.25)] ring-1 ring-blue-200/60">
        <div className="flex w-1/2 flex-col justify-center bg-white px-7 py-7">
          <img
            src="/brasao_unifor.png"
            alt="Unifor Logo"
            className="mx-auto mb-4 w-20"
          />

          <h1 className="mb-7 text-center text-2xl font-bold text-blue-600">
            Acesso ao MOBIFOR
          </h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="matricula"
                className="mb-2 block text-lg font-bold text-black"
              >
                Matrícula
              </label>

              <input
                type="text"
                id="matricula"
                value={matricula}
                maxLength={7}
                onChange={(e) => setMatricula(e.target.value)}
                className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="password"
                className="mb-2 block text-lg font-bold text-black"
              >
                Senha
              </label>

              <input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={permanecerConectado}
                onChange={(e) => setPermanecerConectado(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-blue-600"
              />

              Permanecer conectado
            </label>

            {erro && (
              <p className="mb-4 text-center text-sm font-semibold text-red-600">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-blue-700 text-lg font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loading ? "Entrando..." : "Acessar"}
            </button>
          </form>
        </div>

        <div className="w-1/2">
          <img
            src="/foto_estacionamento.png"
            alt="Estacionamento"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  )
}