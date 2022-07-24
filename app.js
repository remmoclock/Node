const express = require('express')
const app = express()
const port = 3000

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
