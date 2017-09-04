const sharp = require('sharp')
const fs = require('fs')

const transformer = sharp()
  .resize(400, 450)
  .crop(sharp.gravity.north)
  .on('error', function(err) {
        console.log(err);
  });
var r = fs.createReadStream('src.jpg')
var w = fs.createWriteStream('figure.jpg')
r.pipe(transformer).pipe(w)
