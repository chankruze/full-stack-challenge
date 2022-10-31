/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 13:58:49 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type Exchange = {
  name: string
  url: string
}

export type ExchangeBook = Exchange & { asks: any[][] }

export type AverageCost = {
  [exchange: string]: number
}
