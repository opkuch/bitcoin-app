import React from 'react'
import menuImg from '../assets/images/menu.svg'
export function BurgerMenu({onToggleMenu}) {
  return (
        <img src={menuImg} className="burger-menu" onClick={() => onToggleMenu()}/>
  )
}
