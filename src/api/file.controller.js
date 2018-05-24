const formidable = require('formidable');
const filepreview = require('filepreview');
const crypto = require('crypto');

exports.filePreview = (req, res) => {
  const form = new formidable.IncomingForm();
 
  form.parse(req);

  form.on('fileBegin', (name, file) => { file.path = '/tmp/' + file.name });

  form.on('file', (name, file) => {
    (async () => {
      let path = '/tmp/' + crypto.createHash('sha256').update(file.name).digest('hex') + '.jpg';
      let options = { quality: 100 }
      await filepreview.generateSync('/tmp/' + file.name, path, options);
      await res.sendFile(path);
    })();
  });
}
