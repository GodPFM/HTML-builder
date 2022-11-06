const fs = require('fs');
const path = require('path');
const readline = require('readline');

let file = path.resolve(__dirname,'text.txt');
let writeIntoFile = fs.createWriteStream(file);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Something else? > '
});

console.log('Hello! Want to write something?');

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    console.log('See ya!');
    return;
  }
  writeIntoFile.write(input + '\n');
  rl.prompt();
})

rl.on('SIGINT', () => {
  rl.close();
  console.log('\nSee ya!');
})
