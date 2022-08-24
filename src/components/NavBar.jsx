import React from 'react'
import { NavLink } from 'react-router-dom'

export function NavBar() {
  return (
    <nav className="flex">
    <NavLink exact to="/">
      Home
    </NavLink>
    <NavLink exact to="/contacts">
      Contacts
    </NavLink>
    <NavLink exact to="/statistics">
      Statistics
    </NavLink>
  </nav>

  )
}
