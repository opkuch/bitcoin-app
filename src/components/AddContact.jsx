import React from 'react'
import { Link } from 'react-router-dom'
import addImg from '../assets/images/add.svg'
export function AddContact() {
  return (
    <Link className="add-contact contact-preview flex justify-center align-center" to="/contacts/edit">
      <img className='add-img' src={addImg} />
      <li><h2>Add Contact</h2></li>
    </Link>
  )
}
