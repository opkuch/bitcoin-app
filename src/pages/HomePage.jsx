import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Component } from 'react'
import { userService } from '../services/userService'
import { bitcoinService } from '../services/bitcoinService'
import { setUser } from '../store/actions/userActions'
import {MovesList} from '../components/MovesList'
import usdImg from '../assets/images/usd.svg'
import bitcoinImg from '../assets/images/bitcoin-2.svg'


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
    } else {
      this.setState({userBtc: null})
    }
  }
  componentDidUpdate({loggedInUser}, prevState) {
    if (loggedInUser.name !== this.props.loggedInUser.name) {
      this.setState({userBtc: null})
  }
}
  async onGetRate(coins) {
    return await bitcoinService.getRate(coins)
  }

  render() {
    const { loggedInUser } = this.props
    const { userBtc, btcRate } = this.state
    var lastMoves = []
    console.log(loggedInUser, 'loggedinUser')
    for (var i = loggedInUser.moves.length - 1; i >= 0; i--) {
      lastMoves.push(loggedInUser.moves[i])
      if (lastMoves.length === 3) break
    }
    return (
      <div className="container home-page flex column align-center">
        <h1>Hi, {loggedInUser.name}</h1>
        <div className="info-wrapper flex">
          <section className="user-info flex column">
            <span className="home-title small-title flex column align-center">
            <img className='svg-medium' src={usdImg}/>
              Current balance 
            </span>
            <span className='info'>
              {loggedInUser.name === 'Guest'
                ? 'Please sign up first..'
                : 'USD: ' + loggedInUser.coins + '$'}
            </span>
            <Link className="signup-link" to="/signup">
              {loggedInUser.name === 'Guest' ? 'Sign-Up Here!' : ''}
            </Link>
            <span className='info'>{userBtc ? 'BTC: ' + userBtc : ''}</span>
          </section>
          <section className="bitcoin-rate flex column">
            <span className="home-title small-title flex column align-center">
            <img className='svg-medium' src={bitcoinImg}/>
              Current btc rate
              </span>
            <h1>{btcRate}$</h1>
          </section>
          <MovesList lastMoves={lastMoves}/>
        </div>
        
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
