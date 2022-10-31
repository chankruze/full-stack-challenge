/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 11:37:49 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { Exchange } from '../types'

export const exchanges: Exchange[] = [
  {
    url: 'https://api.exchange.coinbase.com/products/btc-usd/book?level=2',
    name: 'coinbase'
  },
  {
    url: 'https://api3.binance.com/api/v3/depth?symbol=BTCUSDT&limit=50',
    name: 'binance'
  }
]
