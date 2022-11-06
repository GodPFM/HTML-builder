const fs = require('fs');
const path = require('path');

const folderWithStyles = path.resolve(__dirname,'styles');
const folderWithProject = path.resolve(__dirname,'project-dist');

const writeStream = fs.createWriteStream(path.resolve(folderWithProject, 'bundle.css'));

fs.readdir(folderWithStyles, {withFileTypes: true}, (err, files) => {
  for (let i = 0; i < files.length; i++) {
    if (path.extname(files[i].name) === '.css') {
      fs.readFile(path.resolve(folderWithStyles, files[i].name),(err, data) => {
        if (err) {
          throw new Error(err);
        } else {
          console.log(i);
          writeStream.write(data + '\n');
        }
      })
    }
  }
})
