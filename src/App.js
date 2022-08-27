import { Component } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import './assets/styles/global.scss'
import { HomePage } from './pages/HomePage'
import { Signup } from './pages/Signup'
import { ContactPage } from './pages/ContactPage'
import { bitcoinService } from './services/bitcoinService'
import { ContactDetails } from './pages/ContactDetailsPage'
import { AppHeader } from './components/AppHeader'
import { ContactEdit } from './pages/ContactEditPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { Background } from './components/Background'
import { Footer } from './components/Footer'

export default class App extends Component {
  async coinsToBitcoin() {
    const { user } = this.state
    if (!user) return
    try {
      const btc = await bitcoinService.getRate(user.coins)
      this.setState({ btc })
    } catch (err) {
      console.log('problems with getting bitcoin rate', err)
    }
  }
  render() {
    return (
      <Router>
        <AppHeader />
        <div className="app-wrapper">
          <div className="bitcoin-app">
            <Switch>
              <Route path="/contacts/edit/:id?" component={ContactEdit} />
              <Route path="/contacts/:id" component={ContactDetails} />
              <Route path="/signup" component={Signup} />

              <Route path="/contacts" component={ContactPage} />
              <Route path="/statistics" component={StatisticsPage} />
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
        <Background />
      </Router>
    )
  }
}
