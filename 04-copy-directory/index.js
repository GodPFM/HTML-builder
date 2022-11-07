const fs = require('fs');
const path = require('path');

const pathOfNewFolder = path.resolve(__dirname,'files-copy');
const pathOfCopyFolder = path.resolve(__dirname, 'files');

fs.mkdir(pathOfNewFolder,{recursive: true}, (err) => {
  if (err) {
    throw new Error(err);
  }
});

deleteFiles(pathOfNewFolder);

function deleteFiles(pathOfAssets) {
  fs.readdir(pathOfAssets,{withFileTypes: true}, async (err, files) => {
    for (let item of files) {
      await fs.promises.rm(path.resolve(pathOfAssets, item.name),{recursive:true, force: true}, (err) =>{});
    }
    copyAssets(pathOfCopyFolder, pathOfNewFolder);
  });
}

function copyAssets(pathOfAssets, pathOfProjectAssets) {
  fs.readdir(pathOfAssets, {withFileTypes: true}, (err, files) => {
    for (let item of files) {
      if (item.isFile()) {
        fs.copyFile(path.resolve(pathOfAssets, item.name), path.resolve(pathOfProjectAssets, item.name), (err) => {
          if (err) {
            throw new Error(err);
          }
        })
      } else {
        fs.mkdir(path.resolve(pathOfProjectAssets, item.name),{recursive: true}, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
        copyAssets(path.resolve(pathOfAssets, item.name), path.resolve(pathOfProjectAssets, item.name));
      }
    }
  })
}
