const puppeteer = require('puppeteer');
const crypto = require('crypto');

exports.urlPreview = (req, res) => {
  (async () => {
    let path = '/tmp/' + crypto.createHash('sha256').update(req.body.url).digest('hex') + '.jpg';
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(req.body.url);
    await page.screenshot({ path: path, fullPage: true });
    await browser.close();
    await res.sendFile(path);
  })();
}
