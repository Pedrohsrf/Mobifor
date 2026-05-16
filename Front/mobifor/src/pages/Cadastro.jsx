import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarUsuario } from '../services/usuarioService'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [matricula, setMatricula] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('aluno')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleCadastro(event) {
    event.preventDefault()

    setErro('')
    setLoading(true)

    try {
      await cadastrarUsuario({
        nome,
        email,
        matricula,
        senha,
        tipo
      })

      navigate('/')
    } catch (error) {
      setErro(error.message || 'Erro ao cadastrar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-128px)] items-center justify-center overflow-hidden bg-blue-50">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.20)] ring-1 ring-blue-200/60">
        <img
          src="/brasao_unifor.png"
          alt="Unifor Logo"
          className="mx-auto mb-4 w-20"
        />

        <h1 className="mb-7 text-center text-2xl font-bold text-blue-600">
          Cadastro de Usuário
        </h1>

        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label htmlFor="nome" className="mb-2 block text-lg font-bold text-black">
              Nome
            </label>

            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-lg font-bold text-black">
              Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="matricula" className="mb-2 block text-lg font-bold text-black">
              Matrícula
            </label>

            <input
              type="text"
              id="matricula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="senha" className="mb-2 block text-lg font-bold text-black">
              Senha
            </label>

            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="tipo" className="mb-2 block text-lg font-bold text-black">
              Tipo
            </label>

            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="aluno">Aluno</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

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
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-4 h-11 w-full rounded-lg bg-gray-100 text-lg font-bold text-blue-700 transition hover:bg-gray-200"
          >
            Voltar para Login
          </button>
        </form>
      </div>
    </main>
  )
}