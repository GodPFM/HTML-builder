const path = require('path');
const fs = require('fs');
const readdir = require("fs");

let pathToFolder = path.resolve(__dirname, 'secret-folder');
console.log(pathToFolder);

fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
  if (err) {
    throw new Error(err);
  }
  for (let i = 0; i < files.length;i++) {
    if (files[i].isFile()) {
      let fileExtention = path.extname(files[i].name);
      let fileName = path.basename(files[i].name, fileExtention);
      fs.stat(path.resolve(pathToFolder, files[i].name), (error, stats) => {
        if (err) {
          throw new Error(err);
        }
        console.log(fileName + ' - ' + fileExtention.match(/\w+/g) + ' - ' + stats.size / 1024 + 'kb');
      });
    }
  }
});
