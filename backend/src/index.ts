/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:00 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import dotenv from 'dotenv'
import app from './App'
import { banner } from './utils'

// import env variables
dotenv.config()

let port: number = parseInt(process.env.PORT) || 4000

app.listen(port, banner(port)).on('error', (err) => {
  if (err.message.includes('EADDRINUSE')) {
    return app.listen(++port, banner(port))
  }
})
