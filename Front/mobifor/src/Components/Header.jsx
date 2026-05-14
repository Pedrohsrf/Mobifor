import uniforLogo from '../assets/Unifor_logo.svg.png'

export default function Header() {
    return (
        <header>
      <div className="main-header">
        <div className="logo">
          <img src={uniforLogo} alt="Unifor" className="logo-icon"/>
        </div>
        <h1 className="site-title">MOBIFOR</h1>
      </div>
    </header>
    )
}