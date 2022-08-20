import { Component } from 'react'
import { bitcoinService } from '../services/bitcoinService'
import { Chart } from '../components/Chart'
import { connect } from 'react-redux'

 class _StatisticsPage extends Component {
  state = {
    marketPrice: null,
    transactionAmount: null,
    isLoading: true,
  }
  async componentDidMount() {
    if (this.props.loggedInUser.name === 'Guest') {
      this.props.history.push('/signup')
      return
    }
    const marketPriceData = await bitcoinService.getMarketPrice()
    const transactionsData = await bitcoinService.getConfirmedTransactions()

    const marketPrice = {
      data: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            fill: true,
            label: 'USD',
            data: marketPriceData.values,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
          },
          y: {
            ticks: {
              color: '#fff',
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#fff',
            },
          },
          title: {
            display: true,
            text: marketPriceData.name,
            color: '#fff',
          },
        },
      },
    }
    const transactionAmount = {
      data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            fill: true,
            label: 'USD',
            data: transactionsData.values,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
          },
          y: {
            ticks: {
              color: '#fff',
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#fff',
            },
          },
          title: {
            display: true,
            text: 'Confirmed Transactions Per Month',
            color: '#fff',
          },
        },
      },
    }
    this.setState({ marketPrice, transactionAmount, isLoading: false })
  }
  render() {
    const { marketPrice, transactionAmount, isLoading } = this.state
    console.log(transactionAmount)
    if (isLoading) return <div>Loading...</div>
    return (
      <div className="statistics-page container">
        <h1 className='page-headline'>Latest Statistics</h1>
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
}

export const StatisticsPage = connect(mapStateToProps, mapDispatchToProps)(_StatisticsPage)
