/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT || 2002
const MONGODB_URI = process.env.MONGODB_URI

console.log(MONGODB_URI)

module.exports = {
  MONGODB_URI,
  PORT
}