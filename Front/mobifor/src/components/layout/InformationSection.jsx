import { useState } from 'react'

export default function InformationSection() {
  const [active, setActive] = useState('quemSomos')

  const textos = {
    quemSomos: (
      <>
        <p className='text-lg text-gray-700 mb-2 font-bold'>
          Somos um grupo de estudantes da Universidade Unifor, comprometidos em desenvolver soluções inovadoras para os desafios do dia a dia.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          Percebemos que uma das principais dificuldades enfrentadas pelos estudantes da Universidade Unifor é o acesso a informações sobre o estacionamento disponível no campus.
          Assim, decidimos criar o MOBIFOR, um sistema de monitoramento de estacionamento que visa fornecer informações em tempo real sobre a disponibilidade de vagas, facilitando a vida dos estudantes e otimizando o uso do espaço de estacionamento no campus.
        </p>
      </>
    ),
    comoUsar: (
      <>
        <p className='text-lg text-gray-700 mb-2 font-bold'>
          O MOBIFOR é uma plataforma intuitiva e fácil de usar, projetada para fornecer informações precisas sobre a disponibilidade de vagas de estacionamento no campus da Universidade Unifor.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          Para utilizar o MOBIFOR, basta acessar a plataforma por meio do site ou aplicativo móvel, onde você encontrará um mapa interativo do campus com as áreas de estacionamento destacadas.
          As vagas disponíveis serão indicadas em tempo real, permitindo que você planeje sua chegada e encontre uma vaga de forma rápida e eficiente.
        </p>
      </>
    ),
  }

  return (
    <section id="faq" className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-60">

      <div className="border-2 border-blue-300 rounded-2xl bg-gray-100 p-30 shadow-md max-w-5xl mx-auto">

        <div className="flex justify-center gap-4 mb-8 px-4">
          <button
            onClick={() => setActive('quemSomos')}
            className={`flex flex-col items-center gap-2 transition rounded-xl p-4 w-28 shadow-sm
              ${active === 'quemSomos' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
          >
            <i className={`bi bi-buildings text-4xl ${active === 'quemSomos' ? 'text-white' : 'text-gray-700'}`}></i>
            <span className="text-sm font-semibold">Quem Somos</span>
          </button>

          <button
            onClick={() => setActive('comoUsar')}
            className={`flex flex-col items-center gap-2 transition rounded-xl p-4 w-28 shadow-sm
              ${active === 'comoUsar' ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
          >
            <i className={`bi bi-p-square text-4xl ${active === 'comoUsar' ? 'text-white' : 'text-gray-700'}`}></i>
            <span className="text-sm font-semibold">Como usar?</span>
          </button>
        </div>

        <div className="text-gray-700 text-sm leading-relaxed flex flex-col gap-4 px-4">
          {textos[active]}
        </div>

      </div>

    </section>
  )
}