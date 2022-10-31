/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:43:14 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'
import { exchanges } from '../data/exchanges'
import { calculateTradeCost, fetchOrderBook } from '../utils'
import type { AverageCost, Exchange, ExchangeBook } from '../types'

const router = express.Router()

router.get('/exchange-routing', async (req, res) => {
  try {
    if (!req.query.amount) {
      return res.status(400).json({
        message: 'The BTC amount is required'
      })
    }

    // the amount of BTC to be traded
    const btcAmount = parseFloat(req.query.amount as string)

    // fetch the order books of each exchanges
    const books: ExchangeBook[] = await Promise.all(
      exchanges.map(async (e: Exchange) => ({
        ...e,
        asks: await fetchOrderBook(e.url)
      }))
    )

    // if oreder books of the exchanges are not found or empty
    if (!books || books.length === 0) {
      return res.status(500).json({
        message: 'Unable to fetch order books!'
      })
    }
    // calculate the trading cost for each exchange
    const avgCost: AverageCost = calculateTradeCost(btcAmount, books)
    // find the minimum cost of buying given BTC amount
    const usdAmount = Math.min(...Object.values(avgCost))
    // get the cheapest exchange name from the cheapest price
    const exchange = Object.keys(avgCost).find(
      (key) => avgCost[key] === usdAmount
    )
    // response with the required data
    return res.json({
      btcAmount,
      usdAmount,
      exchange
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }
})

export default router
