import { Component } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../services/contactService'
import saveImg from '../assets/images/confirm.svg'
import backImg from '../assets/images/back.svg'
import removeImg from "../assets/images/remove.svg"

export class ContactEdit extends Component {
  state = {
    contact: null,
  }
  async componentDidMount() {
    const contactId = this.props.match.params.id
    const contact = contactId
      ? await contactService.getContactById(contactId)
      : contactService.getEmptyContact()
    this.setState({ contact })
  }
  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }))
  }

  onSaveContact = async (ev) => {
    ev.preventDefault()
    await contactService.saveContact({ ...this.state.contact })
    this.props.history.push('/')
  }

  onRemoveContact = async (contactId) => {
    await contactService.deleteContact(contactId)
    this.props.history.push('/contacts')
  }


  onBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { contact } = this.state
    if (!contact) return <div>Loading...</div>

    return (
      <section className="container edit-contact">
        <section className="edit-header flex align-center space-between">
          <a
            className="back-btn flex column align-center"
            onClick={this.onBack}
          >
            <img src={backImg} />
          </a>
          <h1 className='page-headline'>{contact._id ? 'Edit' : 'Add'} Contact</h1>
          <a
            className="flex column align-center"
            onClick={() => this.onRemoveContact(contact._id)}
            style={{opacity: contact._id? '1' : '0', pointerEvents: contact._id? 'all' : 'none'}}
            >
            <img src={removeImg} />
          </a>
        </section>

        <form onSubmit={this.onSaveContact}>
          <label htmlFor="name">Name</label>
          <input
            autoFocus
            type="text"
            id="name"
            name="name"
            value={contact.name}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={contact.email}
            onChange={this.handleChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={this.handleChange}
          />
          <section className="edit-actions flex align-center">
            <button className="flex column">
              <img className="confirm-img" src={saveImg} />
              <span>Save</span>
            </button>
          </section>
        </form>
      </section>
    )
  }
}
