const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/books', (req, res) => {
  res.send('All Books!')
})
app.get('/books/:id', (req, res) => {
  res.send('1 Book!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
