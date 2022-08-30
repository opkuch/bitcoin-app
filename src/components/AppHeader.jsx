import logo from '../assets/images/logo.svg'
import { connect } from 'react-redux'
import { setUser } from '../store/actions/userActions'
import { userService } from '../services/userService'
import { NavBar } from './NavBar'
import {BurgerMenu} from './BurgerMenu'
import { useRef } from 'react'
import xImg from '../assets/images/x-close.svg'
function _AppHeader(props) {
  var isSignout
  var navBarRef = useRef()
  function onSignout() {
    userService.signout()
    props.setUser({
      name: 'Guest',
      coins: 0,
      moves: [],
    })
    isSignout = 'none'
  }

  function onToggleMenu() {
    navBarRef.current.classList.toggle('active')

  }
  const { loggedInUser } = props
  if (loggedInUser.name === 'Guest') isSignout = 'none'
  else isSignout = 'inline'

  return (
    <header className='flex align-center space-between app-header'>
        <section className="logo-wrapper">
          <img className="logo" src={logo} />
          <h1>BITpocket</h1>
        </section>
        <section ref={navBarRef} className="navbar-wrapper flex align-center">
          <button onClick={() => onToggleMenu()} className="close-nav-btn"><img src={xImg}  alt="" /></button>
         <NavBar />
          <a
            className="signout"
            onClick={onSignout}
            style={{ display: isSignout }}
          >
            Sign out
          </a>
        </section>
      <BurgerMenu onToggleMenu={onToggleMenu}/>
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
