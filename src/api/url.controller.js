const puppeteer = require('puppeteer');
const crypto = require('crypto');

exports.urlPreview = (req, res) => {
  let path = '/tmp/' + crypto.createHash('sha256').update(req.body.url).digest('hex') + '.jpg';

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(req.body.url);
    await page.screenshot({ path: path, fullPage: true });
    await browser.close();
  })();

  res.sendFile(path);
}
