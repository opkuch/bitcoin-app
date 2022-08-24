import { Component } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../services/contactService'
import { userService } from '../services/userService'
import { utilService } from '../services/utilService'
import unknownContact from '../assets/images/unknown-contact.svg'
import backImg from '../assets/images/back.svg'
import editImg from "../assets/images/edit.svg"
import { TransferFund } from '../components/TransferFund'
import { connect } from 'react-redux'
import { setUser } from '../store/actions/userActions'

class _ContactDetails extends Component {
  state = {
    contact: null,
  }

  async componentDidMount() {
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

  onTransferCoins = (amount, contactName) => {
    const {name,coins, moves} = this.props.loggedInUser
    moves.push({
      id: utilService.makeId(),
      to: contactName,
      amount,
      transferTime: Date.now()
    })
    const userAfterTransfer = {
      name,
      coins: coins - amount,
      moves
    }
    userService.saveUser(userAfterTransfer)
    this.props.setUser(userAfterTransfer)
  }

  render() {
    const { contact } = this.state
    const {loggedInUser} = this.props
    if (!contact) return <div>Loading...</div>
    return (
      <div className="container contact-details flex column align-center">
        <section className="contact-info flex column justify-center align-center">
          <img className="details-img" src={unknownContact} />
          <h1>{contact.name}</h1>
          <h2>{contact.email}</h2>
          <h2>{contact.phone}</h2>
        </section>
        <TransferFund contact={contact} maxCoins={loggedInUser.coins} onTransferCoins={this.onTransferCoins}/>
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
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  setUser,
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)
