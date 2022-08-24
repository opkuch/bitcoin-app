import { Component } from 'react'
import { ContactFilter } from '../components/ContactFilter.jsx'
import { ContactList } from '../components/ContactList.jsx'
import { contactService } from '../services/contactService.js'
import { userService } from '../services/userService.js'
import { connect } from 'react-redux'
import { setUser } from '../store/actions/userActions'

class _ContactPage extends Component {
  state = {
    contacts: null,
    selectedContactId: null,
    filterBy: null,
  }

  componentDidMount() {
    const user = userService.getUser()
    const {loggedInUser} = this.props
    if (user && loggedInUser.name !== user.name)
    {
      this.props.setUser(user)
    }
    else if (!user) {
      this.props.history.push('/signup')
      return
    }
    this.loadContacts()
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser.name !== this.props.loggedInUser.name) {
      this.props.history.push('/')
    }
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
  setUser
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)
