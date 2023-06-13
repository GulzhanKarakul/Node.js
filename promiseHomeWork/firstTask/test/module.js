export function prompt(message) {
    return new Promise((resolve, reject) => {
        process.stdout.write(`${message}\n`);
        let input = '';
  
        process.stdin.on('data', (data) => {
            input += data.toString();
            resolve(input.trim());
            process.stdin.pause();
        });
  
        process.stdin.on('error', (err) => {
            reject(err);
        });
    });
}
  