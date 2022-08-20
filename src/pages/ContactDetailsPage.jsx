import { Component } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../services/contactService'
import unknownContact from '../assets/images/unknown-contact.svg'
import backImg from '../assets/images/back.svg'
import editImg from "../assets/images/edit.svg"
import { Title } from 'chart.js'

export class ContactDetails extends Component {
  state = {
    contact: null,
  }

  async componentDidMount() {
    this.loadContact()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }
  async loadContact() {
    const contactId = this.props.match.params.id
    const contact = await contactService.getContactById(contactId)
    this.setState({ contact })
  }
  onBack = () => {
    this.props.history.push('/contacts')
  }
  render() {
    const { contact } = this.state
    if (!contact) return <div>Loading...</div>
    return (
      <div className="container contact-details flex column align-center">
        <section className="contact-info flex column justify-center align-center">
          <img className="details-img" src={unknownContact} />
          <h1>{contact.name}</h1>
          <h2>{contact.email}</h2>
          <h2>{contact.phone}</h2>
        </section>
        <section className="details-actions flex align-center">
          <a
            className="back-btn flex column align-center"
            onClick={this.onBack}
          >
            <img src={backImg} />
            <span>Back</span>
          </a>
          <Link className='flex column align-center edit-link' to={`/contacts/edit/${contact._id}`} title="Edit Contact">
            <img className="action-img" src={editImg} />
            <span>Edit</span>
          </Link>
        </section>
      </div>
    )
  }
}
