import { Component } from 'react'
import { bitcoinService } from '../services/bitcoinService'
import { userService } from '../services/userService.js'
import { setUser } from '../store/actions/userActions'
import { Chart } from '../components/Chart'
import { connect } from 'react-redux'
import moment from 'moment'
import {chartData} from '../services/chartService'

class _StatisticsPage extends Component {
  state = {
    marketPrice: null,
    transactionAmount: null,
    isLoading: true,
  }
  generateDays = (dayAmount) => {
    const days = []
    const dateStart = moment()
    const dateEnd = moment().add(dayAmount, 'days')
    while (dateEnd.diff(dateStart, 'days') >= 0) {
     days.push(dateStart.format('DD/MM'))
     dateStart.add(1, 'days')
    }
    return days
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

    const marketPriceData = await bitcoinService.getMarketPrice()
    const transactionsData = await bitcoinService.getConfirmedTransactions()

    const marketPrice = JSON.parse(JSON.stringify(chartData))
    marketPrice.data.labels = this.generateDays(151)
    marketPrice.data.datasets[0].data = marketPriceData.values
    marketPrice.options.plugins.title.text = 'Market Price (USD)'

    const transactionAmount = JSON.parse(JSON.stringify(chartData))
    transactionAmount.data.labels = this.generateDays(150)
    transactionAmount.data.datasets[0].data = transactionsData.values
    transactionAmount.data.datasets[0].fill = true
    transactionAmount.options.plugins.title.text = 'Confirmed Transaction Per Day'
    this.setState({ marketPrice, transactionAmount, isLoading: false })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loggedInUser.name !== this.props.loggedInUser.name) {
      this.props.history.push('/')
    }
  }

  render() {
    const { marketPrice, transactionAmount, isLoading } = this.state
    console.log(transactionAmount)
    if (isLoading) return <div>Loading...</div>
    return (
      <div className="statistics-page container">
        <section className="charts-wrapper">
          <Chart data={marketPrice.data} options={marketPrice.options} />
          <Chart
            data={transactionAmount.data}
            options={transactionAmount.options}
          />
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
  setUser
}

export const StatisticsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StatisticsPage)
