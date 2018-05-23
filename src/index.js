const express = require('express');
const formidable = require('formidable');
const puppeteer = require('puppeteer');
const filepreview = require('filepreview');

const app = express();

app.use('/api', require('./api'));

//app.use(express.static('public'))

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!")
});

app.listen(3000, () => { console.log('Server is listening on port 3000') });
