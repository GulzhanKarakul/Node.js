const log = console.log;
// log('Hello, whats your name?');

// log(process);
// log(process.stdin);
// process.stdout.write('Hello, whats your name?');
process.stdout.write('Hello, whats your name?');

process.stdin.on('data', (data) => {
    name1 = data.toString();
    log('your name', name1);
    // process.exit(); //Выход из процесса
    // process.kill(); //Убийство процесса
    process.stdin.pause(); //Пауза процесса
    user_as
});jbvn


setTimeout(() => {
    process.stdout.write('Whats your last name?  \n');
    process.stdin.resume()
}, 10000)


