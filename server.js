const express = require('express')
const formidable = require('formidable')
const util = require('util')
const app = express()

//app.use(express.static('public'))

app.get('/', (req, res) => { res.send('Get request from Express!') })
app.post('/', (req, res) => { res.send('Post request from Express!') })

app.post('/upload', (req, res) => {
  
  const form = new formidable.IncomingForm();

  form.parse(req)

  form.on('fileBegin', (name, file) => {
    file.path = __dirname + '/uploads/' + file.name
  })

  form.on('file', (name, file) => {
    console.log('Uploaded ' + file.name);
    res.sendFile(__dirname + '/uploads/' + file.name)
  })


})


app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!")
})

app.listen(3000, () => { console.log('Server is listening on port 3000') })

/*
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened...', err)
  }

  console.log(`Server is listening on port ${port}`);
})
*/
