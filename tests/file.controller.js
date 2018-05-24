  const form = new formidable.IncomingForm();
 
  form.parse(req);

  form.on('fileBegin', (name, file) => { file.path = '/tmp/' + file.name });

  form.on('file', (name, file) => {
    let path = '/tmp/' + crypto.createHash('sha256').update(file.name).digest('hex') + '.jpg';
    let options = { quality: 100 }
    filepreview.generate('/tmp/' + file.name, path, options, () => res.sendFile(path));
  });
}
