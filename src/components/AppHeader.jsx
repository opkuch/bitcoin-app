import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { connect } from 'react-redux'
import { setUser } from '../store/actions/userActions'
import {userService} from '../services/userService'

function _AppHeader(props) {

  var isSignout

  function onSignout() {
    userService.signout()
    props.setUser({
      name: 'Guest',
      coins: 0,
      moves: null
  })
    isSignout = 'none'
  }
  
  const { loggedInUser } = props
  if (loggedInUser.name === 'Guest') isSignout = 'none'
  else isSignout = 'inline'

  return (
    <header>
      <div className="flex space-between align-center app-header">
        <section className="logo-wrapper">
          <img className="logo" src={logo} />
          <h1>BITpocket</h1>
        </section>
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
          <a onClick={onSignout} style={{display: isSignout}}>Sign out</a>
        </nav>
      </div>
    </header>
  )
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  setUser,
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
