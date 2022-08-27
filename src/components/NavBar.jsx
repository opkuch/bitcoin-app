import React from 'react'
import { NavLink } from 'react-router-dom'

export function NavBar() {
  return (
    <nav className="flex">
    <NavLink className="nav-link" exact to="/">
      Home
    </NavLink>
    <NavLink className="nav-link" exact to="/contacts">
      Contacts
    </NavLink>
    <NavLink className="nav-link" exact to="/statistics">
      Statistics
    </NavLink>
  </nav>

  )
}
