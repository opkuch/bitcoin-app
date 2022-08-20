import { Component } from 'react'
import { userService } from '../services/userService'
import { setUser } from "../store/actions/userActions"
import { connect } from 'react-redux'

class _Signup extends Component {
  state = {
    username: ''
  }
  onSignup = (ev) => {
    ev.preventDefault()
    const user = userService.signup(this.state.username)
    this.props.setUser(user)
    this.props.history.push('/')
  }
  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? (+target.value || '') : target.value
    this.setState(prevState => ({ username: value}))
}

  render() {
    const {username} = this.state
    console.log(username)
    return (
      <div className='signup-page container  flex justify-center'>
        <form className='flex column' onSubmit={this.onSignup}>
          <label className='flex column' htmlFor="username">
            <span>Please enter a username</span>
            <input value={username} onChange={this.handleChange} type="text" id="username" name="username" />
          </label>
          <button className='signup-btn self-center'>Sign me up!</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {

  return {
      loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  setUser,
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)