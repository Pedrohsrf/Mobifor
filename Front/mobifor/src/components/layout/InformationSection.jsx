import { useState } from 'react'

export default function InformationSection() {
  const [active, setActive] = useState('quemSomos')

  const textos = {
    quemSomos: (
      <>
        <p className='text-lg text-slate-800 mb-3 font-bold leading-relaxed'>
          Somos um grupo de estudantes da Universidade Unifor, comprometidos em desenvolver soluções inovadoras para os desafios do dia a dia.
        </p>
        <p className='text-lg text-slate-600 mb-4 leading-relaxed'>
          Percebemos que uma das principais dificuldades enfrentadas pelos estudantes da Universidade Unifor é o acesso a informações sobre o estacionamento disponível no campus.
          Assim, decidimos criar o MOBIFOR, um sistema de monitoramento de estacionamento que visa fornecer informações em tempo real sobre a disponibilidade de vagas, facilitando a vida dos estudantes e otimizando o uso do espaço de estacionamento no campus.
        </p>
      </>
    ),
    comoUsar: (
      <>
        <p className='text-lg text-slate-800 mb-3 font-bold leading-relaxed'>
          O MOBIFOR é uma plataforma intuitiva e fácil de usar, projetada para fornecer informações precisas sobre a disponibilidade de vagas de estacionamento no campus da Universidade Unifor.
        </p>
        <p className='text-lg text-slate-600 mb-4 leading-relaxed'>
          Para utilizar o MOBIFOR, basta acessar a plataforma por meio do site ou aplicativo móvel, onde você encontrará um mapa interativo do campus com as áreas de estacionamento destacadas.
          As vagas disponíveis serão indicadas em tempo real, permitindo que você planeje sua chegada e encontre uma vaga de forma rápida e eficiente.
        </p>
      </>
    ),
  }

  return (
    <section id="faq" className="bg-white rounded-3xl shadow-sm border border-blue-100 px-8 py-8">

      <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50 px-12 py-12 shadow-sm border border-blue-200 max-w-5xl mx-auto">

        <div className="flex justify-center gap-4 mb-10 px-4">
          <button
            onClick={() => setActive('quemSomos')}
            className={`flex flex-col items-center gap-2 transition rounded-2xl p-5 w-32 shadow-sm border
              ${active === 'quemSomos' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white hover:bg-blue-50 text-slate-700 border-blue-100'}`}
          >
            <i className={`bi bi-buildings text-4xl ${active === 'quemSomos' ? 'text-white' : 'text-blue-600'}`}></i>
            <span className="text-sm font-bold">Quem Somos</span>
          </button>

          <button
            onClick={() => setActive('comoUsar')}
            className={`flex flex-col items-center gap-2 transition rounded-2xl p-5 w-32 shadow-sm border
              ${active === 'comoUsar' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white hover:bg-blue-50 text-slate-700 border-blue-100'}`}
          >
            <i className={`bi bi-p-square text-4xl ${active === 'comoUsar' ? 'text-white' : 'text-blue-600'}`}></i>
            <span className="text-sm font-bold">Como usar?</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-blue-100 shadow-sm px-10 py-8 text-slate-700 text-sm leading-relaxed flex flex-col gap-4">
          {textos[active]}
        </div>

      </div>

    </section>
  )
}