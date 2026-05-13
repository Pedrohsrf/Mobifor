import uniforLogo from '../assets/background.png'
import uniforLogo2 from '../assets/logo2.png'
import uniforLogin from '../assets/fotologin.png'

export default function Main() {
  return (
    <main>
      <img src={uniforLogo} alt="Background" className="background-img" />

        <div className="form-container">
            <div className='container-left'>
                <img src={uniforLogo2} alt="Unifor Logo"/>
                <h1 className='title-form'>Acesso ao MobiFor</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Matrícula</strong></label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Senha</strong></label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className='btn-entrar'><strong>Acessar</strong></button>
                </form>
                    
            </div>

            <div className='container-right'>
            <img src={uniforLogin} alt="Unifor Logo"/>
            </div>
        </div>

    </main>
  )
}