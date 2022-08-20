import { Component } from 'react'
import { ContactFilter } from '../components/ContactFilter.jsx'
import { ContactList } from '../components/ContactList.jsx'
import { contactService } from '../services/contactService.js'
import { connect } from 'react-redux'

class _ContactPage extends Component {
  state = {
    contacts: null,
    selectedContactId: null,
    filterBy: null,
  }

  componentDidMount() {
    if (this.props.loggedInUser.name === 'Guest') {
      this.props.history.push('/signup')
      return
    }
    this.loadContacts()
  }
  async loadContacts() {
    try {
      const contacts = await contactService.getContacts(this.state.filterBy)
      this.setState({ contacts })
    } catch (err) {
      console.log('had problems with getting contacts..', err)
    }
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadContacts)
  }
  onRemoveContact = async (contactId) => {
    await contactService.deleteContact(contactId)
    this.loadContacts()
  }
  render() {
    const { contacts, selectedContactId } = this.state
    if (!contacts) return <div>Loading...</div>
    return (
      <div className="container contact-page flex column align-center">
        <ContactFilter onChangeFilter={this.onChangeFilter} />
        <ContactList
          contacts={contacts}
          onRemoveContact={this.onRemoveContact}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  }
}

const mapDispatchToProps = {
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
