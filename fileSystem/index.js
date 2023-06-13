import fs from 'fs';
const log = console.log;

// fs.open('text.txt', 'w', (err) => {
//     if (err) throw err;
//     log('Файл создан');

//     let text = 'мама мыла раму';
//     fs.writeFile('text.txt', text, (err) => {
//         if (err) throw err;
//         log('В файл были внесены изменения');
//     });
// });

const num = '0123456789'
let result = 0;

// fs.readFile("text.txt", 'utf8', (err, data) => {
//     if(err) throw err;
//     log(data);
//         for(let n of data){
//             if(num.indexOf(n) > -1){
//                 result +=1;
//             }
//         }
//     log(result);
// });

let date = new Date();
date = date.toString();
fs.appendFile('text.txt', date, (err) => {
    if(err) throw err;
    log(date);
});