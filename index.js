import readline from 'readline';

readline.emitKeypressEvents(process.stdin);
readline.emitKeypressEvents(process.stdin);
readline.emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

if (process.stdin.isTTY) process.stdin.setRawMode(true);

console.log('press q to exit, or any key to print log');

process.stdin.on('keypress', (chunk, key) => {
  if (key && key.name == 'q'){
    process.exit();
  }
  console.log({key});
});