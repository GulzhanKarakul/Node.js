import fs from 'fs';

const log = console.log;

process.stdout.write('Which type of data you want to read?');

process.stdin.on('data', (buffer) => {
    let type = buffer.toString().trim();
    log('type file', type);

    if(type === '/html'){
        fs.readFile("text.html", 'utf8', (err, data) => {
            if(err) throw err;
            log(data);
        });
    }else if(type == '/txt'){
        fs.readFile("text.txt", 'utf8', (err, data) => {
            if(err) throw err;
            log(data);
        });
    } else if(type.includes('/text?')) {
        let newText = type.slice(6);
        let keyArr = newText.split('=');
        fs.appendFile('text.txt', `Ключ: ${keyArr[0]}\nЗначение: ${keyArr[1]}\n`, (err) => {
            if(err) throw err;
            log(keyArr);
        })
    } else if( type === '/dir'){
        fs.readdir('.', {withFileTypes: true},(err, fileList) => {
            for(let x of fileList){
                log(x);
            }
        });
    }
    // process.exit(); //Выход из процесса
    // process.kill(); //Убийство процесса
    process.stdin.pause(); //Пауза процесса
})