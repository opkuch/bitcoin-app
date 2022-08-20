import axios from 'axios'
import { storageService } from './storageService'
export const bitcoinService = {
  getRate,
  getMarketPrice,
  getConfirmedTransactions,
  btcToUsdRate
}
const KEY = 'bitcoin_db'

async function btcToUsdRate() {
  try {
    const { data } = await axios.get('https://blockchain.info/ticker')
    return data.USD.last
  } catch (err) {
    console.log('Cannot get bitcoin, error occurd', err)
  }
}

async function getRate(coins) {
  try {
    const { data } = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    )
    return data
  } catch (err) {
    console.log('Cannot get bitcoin, error occurd', err)
  }
}

async function getMarketPrice() {
  const bitcoinData = storageService.load(KEY) || {}
  if (bitcoinData.marketPrices) return bitcoinData.marketPrices
  return await _prepData('market-price')
}

async function getConfirmedTransactions() {
  const bitcoinData = storageService.load(KEY) || {}
  if (bitcoinData.confirmedTransactions)
    return bitcoinData.confirmedTransactions
  return await _prepData('n-transactions')
}

async function _prepData(type) {
  const timespan = 5
  const res = await axios.get(
    `https://api.blockchain.info/charts/${type}?timespan=${timespan}months&format=json&cors=true`
  )
  const { name, description, values } = res.data
  const bitcoinValues = []
  var monthlySum = 0
  values.map((value, idx) => {
    monthlySum += value.y
    if (idx && idx % 30 === 0) bitcoinValues.push(monthlySum)
  })
  const resDetails = {
    name,
    description,
    values: bitcoinValues,
  }
  const bitcoinData = storageService.load(KEY) || {}
  bitcoinData[type] = resDetails
  storageService.store(KEY, bitcoinData)
  return resDetails
}
