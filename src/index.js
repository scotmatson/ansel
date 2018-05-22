var filepreview = require('filepreview');

let fileIn = process.argv[2];

if (fileIn) {
  let fileOut = fileIn.split('.')[0] + '.jpg';
  filepreview.generate(fileIn, fileOut, function(error) {
    if (error) {
      return console.log(error);
    } else {
      console.log('File preview completed');
    }
  });
} else {
  console.log('You need to pass a file as the argument.');
}
