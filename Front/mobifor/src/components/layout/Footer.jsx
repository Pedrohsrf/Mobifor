import imgfooter from '../../../public/imgfooter.png'

export default function Footer() {
  return (
   <footer className="bg-gray-200 text-black py-5">
  <div className="container mx-auto flex items-center justify-between px-6">

    <div className="flex-shrink-0 ">
      <img src="/imgfooter.png" alt="UNIFOR" className="h-20 w-auto " />
    </div>

    <div className="text-center">
      <p className="text-2xl font-bold ">
        Mobifor – STRP, Universidade de Fortaleza.
      </p>
    </div>

    <div className="text-sm text-right space-y-1">
      <p className="flex items-center justify-end gap-1 text-base">
        <i className='bi bi-telephone'>
            </i>(85) 99999 – 9999
      </p>
      <p className="flex items-center justify-end gap-1 text-base">
        <i className='bi bi-envelope'>
            </i> mobifor@edu.unifor.br
      </p>
    </div>

  </div>
</footer>
  )
}