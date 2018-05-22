const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const filepreview = require('filepreview');
const util = require('util');

const app = express();

//app.use(express.static('public'))

app.get('/', (req, res) => { res.send('Get request from Express!') })
app.post('/', (req, res) => { res.send('Post request from Express!') })

app.post('/preview/url', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req)

  form.on('fileBegin', (name, file) => {
    file.path = __dirname + '/uploads/' + file.name
  })

  form.on('file', (name, file) => {
    let fileOut = __dirname + '/uploads/' + file.name.split('.')[0] + '.jpg';
    let options = { quality: 100, pagerage: '1-100' }
    filepreview.generate( __dirname + '/uploads/' + file.name, fileOut, options, () => res.sendFile(fileOut));
  })
})

app.post('/preview/file', (req, res) => {
  const form = new formidable.IncomingForm();

  form.on('fileBegin', (name, file) => {
    file.path = __dirname + '/uploads/' + file.name
  })

  form.on('file', (name, file) => {
    let fileOut = __dirname + '/uploads/' + file.name.split('.')[0] + '.jpg';
    let options = { quality: 100, pagerage: '1-100' }
    filepreview.generate( __dirname + '/uploads/' + file.name, fileOut, options, () => res.sendFile(fileOut));
  })
})


app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!")
})

app.listen(3000, () => { console.log('Server is listening on port 3000') })


