import next from 'next'

const express = require('express')
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json({ limit: '10kb' }));
  server.all('/*', function(_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  })

  require('./config/api.ts')(server, handle)

  server.listen(port, err => {
    if (err) {
      throw err
    }
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
})
