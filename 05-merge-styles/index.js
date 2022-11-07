const fs = require('fs');
const path = require('path');

const folderWithStyles = path.resolve(__dirname,'styles');
const folderWithProject = path.resolve(__dirname,'project-dist');

const writeStream = fs.createWriteStream(path.resolve(folderWithProject, 'bundle.css'));

fs.readdir(folderWithStyles, {withFileTypes: true}, (err, files) => {
  for (let item of files) {
    if (path.extname(item.name) === '.css') {
      const pathToFile = path.resolve(folderWithStyles, item.name);
      let copyOfFile = fs.createReadStream(pathToFile);
      copyOfFile.pipe(writeStream);
    }
  }
})
