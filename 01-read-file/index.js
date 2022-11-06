const fs = require('fs');
const path = require('path');

let pathToFile = path.join(__dirname,'text.txt');
let stream = fs.createReadStream(pathToFile);

stream.on('data', (chunk) => {
    console.log(chunk.toString());
})
