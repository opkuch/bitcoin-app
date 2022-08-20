import { AddContact } from './AddContact.jsx'
import {ContactPreview} from './ContactPreview.jsx'

export function ContactList({contacts, onRemoveContact}) {
  return (
    <ul className='clean-list contact-list'>
        {contacts.map(contact => <ContactPreview key={contact._id} contact={contact} onRemoveContact={onRemoveContact}/>)}
        <AddContact />
    </ul>
  )
}
