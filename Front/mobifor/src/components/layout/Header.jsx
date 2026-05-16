export default function Header() {
  return (
    <header className="relative w-full bg-white px-8 py-6 shadow-md border-b border-blue-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center ml-10">
          <img src="/logo_unifor.png" alt="Unifor" className="w-32 h-auto" />
        </div>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold text-blue-600 tracking-wide">
          MOBIFOR
        </h1>
      </div>
    </header>
  )
}