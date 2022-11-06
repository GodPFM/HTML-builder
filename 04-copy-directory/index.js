const fs = require('fs');
const path = require('path');

const pathOfNewFolder = path.resolve(__dirname,'files-copy');
const pathOfCopyFolder = path.resolve(__dirname, 'files');

fs.mkdir(pathOfNewFolder,{recursive: true}, (err) => {
  if (err) {
    throw new Error(err);
  }
});

fs.readdir(pathOfNewFolder, (err, files) => {
  if (err) {
    throw new Error(err);
  }
  for (let i = 0; i < files.length;i++) {
    fs.unlink(path.resolve(pathOfNewFolder, files[i]), (err) => {
      if (err) {
        throw new Error(err);
      }
    })
  }
})

fs.readdir(pathOfCopyFolder, (err, files) => {
  if (err) {
    throw new Error(err);
  }
  for (let i = 0; i < files.length;i++) {
    fs.copyFile(path.resolve(pathOfCopyFolder,files[i]), path.resolve(pathOfNewFolder,files[i]), (err) => {
      if (err) {
        throw new Error(err);
      }
    })
  }
})
