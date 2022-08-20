import { Link } from "react-router-dom";
import unknownContact from "../assets/images/unknown-contact.svg"
import editImg from "../assets/images/edit.svg"
import removeImg from "../assets/images/red-x.svg"

export function ContactPreview({contact, onRemoveContact}) {
  return (
    <li className="clean-list contact-preview">
        <Link to={`/contacts/${contact._id}`} className="contact-info flex align-center">
            <img src={unknownContact} />
            <section className="info-preview flex column">
            <h2>{contact.name}</h2>
            <span>{contact.phone}</span>
            </section>
        </Link>
        <section className="actions flex">
            <Link to={`/contacts/edit/${contact._id}`} title="Edit Contact">
              <img className="action-img" src={editImg}/>
            </Link>
            <button onClick={() => onRemoveContact(contact._id)} title="Remove Contact">
              <img className="action-img" src={removeImg}/>
            </button>
        </section>
    </li>
  )
}
