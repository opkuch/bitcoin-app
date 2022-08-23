import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'
import { userService } from '../services/userService'
import { bitcoinService } from '../services/bitcoinService'
import { setUser } from '../store/actions/userActions'

class _HomePage extends Component {
  state = {
    userBtc: null,
    btcRate: null,
  }
  async componentDidMount() {
    const btcRate = await bitcoinService.btcToUsdRate()
    this.setState({ btcRate })
    const user = userService.getUser()
    const { loggedInUser } = this.props
    if (user && loggedInUser.name === 'Guest') {
      this.props.setUser(user)
    }
    if (user) {
      const userBtc = await this.onGetRate(user.coins)
      this.setState({ userBtc })
    }
  }

  async onGetRate(coins) {
    return await bitcoinService.getRate(coins)
  }

  render() {
    const { loggedInUser } = this.props
    const { userBtc, btcRate } = this.state
    return (
      <div className="container home-page flex column align-center">
        <h1>Hi, {loggedInUser.name}</h1>
        <div className="info-wrapper flex">
          <section className="user-info flex column">
            <span className="small-title">Current balance</span>
            <span>
              {!loggedInUser.moves
                ? 'Please sign up first..'
                : 'USD: ' + loggedInUser.coins + '$'}
            </span>
            <Link className="signup-link" to="/signup">
              {loggedInUser.moves ? '' : 'Sign-Up Here!'}
            </Link>
            <span>{userBtc ? 'BTC: ' + userBtc : ''}</span>
          </section>
          <section className="bitcoin-rate flex column">
            <span className="small-title">Current btc rate</span>
            <h1>{btcRate}$</h1>
          </section>
        </div>
        <section className="last-moves"></section>
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

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
