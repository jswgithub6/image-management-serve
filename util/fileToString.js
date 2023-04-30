const fs = require('fs/promises')

exports.fileToString = (imagePath) => fs.readFile(imagePath, "base64");
