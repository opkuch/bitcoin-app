import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
export function AppHeader() {
  return (
    <header>
      <div className="flex space-between align-center app-header">
        <section className="logo-wrapper">
        <img className='logo' src={logo}/>
        <h1>BITpocket</h1>
        </section>
        <nav className="flex">
          <NavLink exact to="/">Home</NavLink>
          <NavLink exact to="/contacts">Contacts</NavLink>
          <NavLink exact to="/statistics">Statistics</NavLink>
        </nav>
      </div>
    </header>
  )
}
