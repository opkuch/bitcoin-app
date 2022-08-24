import logo from '../assets/images/logo.svg'
import { connect } from 'react-redux'
import { setUser } from '../store/actions/userActions'
import { userService } from '../services/userService'
import { NavBar } from './NavBar'

function _AppHeader(props) {
  var isSignout

  function onSignout() {
    userService.signout()
    props.setUser({
      name: 'Guest',
      coins: 0,
      moves: [],
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
        <section className="navbar-wrapper flex align-center">
         <NavBar />
          <a
            className="signout"
            onClick={onSignout}
            style={{ display: isSignout }}
          >
            Sign out
          </a>
        </section>
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

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader)
