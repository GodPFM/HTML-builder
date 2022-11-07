const fs = require('fs');
const path = require('path');

const projectPath = path.resolve(__dirname,'project-dist');
const assetsPath = path.resolve(__dirname,'assets');
const componentsPath = path.resolve(__dirname,'components');
const stylesPath = path.resolve(__dirname,'styles');

fs.mkdir(projectPath,{recursive: true}, (err) => {
  if (err) {
    throw new Error(err);
  }
});

fs.mkdir(path.resolve(projectPath,'assets'), {recursive: true}, (err) => {
  if (err) {
    throw new Error(err);
  }
})

deleteFiles(path.resolve(projectPath, 'assets'));

function deleteFiles(pathOfAssets) {
  fs.readdir(pathOfAssets,{withFileTypes: true}, async (err, files) => {
    for (let item of files) {
      await fs.promises.rm(path.resolve(pathOfAssets, item.name),{recursive:true, force: true}, (err) =>{});
    }
    copyAssets(assetsPath, path.resolve(projectPath, 'assets'));
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

const styleFileStream = fs.createWriteStream(path.resolve(projectPath, 'style.css'));

fs.readdir(stylesPath,{withFileTypes: true}, (err, files) => {
  for (let item of files) {
    if (path.extname(item.name) === '.css') {
      const pathToFile = path.resolve(stylesPath,item.name);
      let textIntoFile = fs.createReadStream(pathToFile);
      textIntoFile.pipe(styleFileStream);
    }
  }
})

const htmlFileStream = fs.createWriteStream(path.resolve(projectPath, 'index.html'));

fs.readdir(componentsPath,{withFileTypes: true}, (err, files) => {
  const htmlFileTemplate = fs.createReadStream(path.resolve(__dirname,'template.html'));
  htmlFileTemplate.on('data', (chunk) => {
    let data = chunk.toString();
    let findTextPromise = new Promise((resolve, reject) => {
      let count = 0;
      for (let item of files) {
        if (path.extname(item.name) === '.html') {
          const pathToFile = path.resolve(componentsPath, item.name);
          const textOfComponent = fs.createReadStream(pathToFile);
          const fileNameToFind = '{{' + path.basename(pathToFile, '.html') + '}}';
          const reg = new RegExp(fileNameToFind,'m',);
          textOfComponent.on('data', (chunk) => {
            data = data.replace(reg, chunk.toString());
            count++;
            if (count === files.length) {
              resolve();
            }
          })
        }
      }
    })
    findTextPromise.then(() => {
      htmlFileStream.write(data);
    })
  });
})
