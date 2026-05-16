export default function Main() {
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

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-lg font-bold text-black">
                Matrícula
              </label>

              <input
                type="email"
                id="email"
                className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-lg font-bold text-black">
                Senha
              </label>

              <input
                type="password"
                id="password"
                className="h-11 w-full rounded-lg bg-gray-200 px-4 text-base outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-lg bg-blue-700 text-lg font-bold text-white transition hover:bg-blue-800"
            >
              Acessar
            </button>
          </form>
        </div>

        <div className="w-1/2">
          <img
            src="/foto_estacionamento.png"
            alt="Unifor Logo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  )
}