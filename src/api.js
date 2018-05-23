const express = require('express');
const formidable = require('formidable');
const puppeteer = require('puppeteer');
const filepreview = require('filepreview');
const crypto = require('crypto');

const router = express.Router();
router.use(express.json());

// URL Preview API
router.post('/url-preview', (req, res) => {
  let path = '/tmp/' + crypto.createHash('sha256').update(req.body.url).digest('hex') + '.jpg';

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(req.body.url);
    await page.screenshot({ path: path, fullPage: true });
    await browser.close();
  })();

  res.sendFile(path);
});

// File preview API
router.post('/file-preview', (req, res) => {
  const form = new formidable.IncomingForm();
 
  form.parse(req);

  form.on('fileBegin', (name, file) => { file.path = '/tmp/' + file.name });

  form.on('file', (name, file) => {
    let path = '/tmp/' + crypto.createHash('sha256').update(file.name).digest('hex') + '.jpg';
    let options = { quality: 100 }
    filepreview.generate( '/tmp/' + file.name, path, options, () => res.sendFile(path));
  })
});

module.exports = router;
