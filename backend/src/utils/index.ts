/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 19:05:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import os from 'os'
import axios from 'axios'
import type { ExchangeBook } from '../types'

export const getNetWorkUrl = () => {
  const networkInterfaces = os.networkInterfaces()

  const validInterfaceKeys = Object.keys(networkInterfaces).filter(
    (nic) => !nic.toLowerCase().includes('lo')
  )

  const validInterfaces = Object.values(
    networkInterfaces[validInterfaceKeys[0]]
  ).filter(
    (alias) =>
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal
  )

  return validInterfaces[0].address || '0.0.0.0'
}

export const isDevEnv = () => process.env.NODE_ENV === 'development'

export const banner = (port) => {
  console.log('├───────────────────────────┤')
  console.log('├ 🚀 server is listening on ┤')
  console.log('├───────────────────────────┤')

  if (isDevEnv()) console.log(`└── <localhost>\thttp://localhost:${port}`)

  return console.log(`└── <network>\thttp://${getNetWorkUrl()}:${port}`)
}

export const fetchOrderBook = async (url: string) => {
  // GET request to API endpoint of the exchange to fetch the order book
  const { data } = await axios.get(url)
  // if no data found return null
  if (!data) return null
  // check if asks data exists and contains atleast one ask
  if (data.asks && data.asks.length > 0) return data.asks
}

export const calculateTradeCost = (
  btcAmount: number,
  exchangeBooks: ExchangeBook[]
) => {
  const avgBuyPrices = {}

  // main loop to traverse the exchanges
  exchangeBooks.forEach((eb: ExchangeBook) => {
    // the BTC amount already bought
    let btcBought = 0
    // the cost of those BTC amount
    let cost = 0

    // secondary loop to traverse order exchangeBooks of the current exchange
    for (let askIdx = 0; askIdx < eb.asks.length; askIdx++) {
      // if the amount of BTC required is alreaddy bought
      // calculate the avrage price and save to avgBuyPrices
      if (btcBought >= btcAmount) {
        avgBuyPrices[eb.name] = cost / askIdx
        break
      }

      // more BTC to buy

      // get the price ask[0] -> 1st element of an ask array
      const price = parseFloat(eb.asks[askIdx][0])
      // get the amount selling ask[1] -> 2nd element of an ask array
      const amount = parseFloat(eb.asks[askIdx][1])
      // pay for the BTC (add to cost)
      cost += price
      // updat the amount bought
      btcBought += amount
    }
  })

  return avgBuyPrices
}
