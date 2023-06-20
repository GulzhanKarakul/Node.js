// Виталий, я сделала немного подругому, но все работает! 
// Просто на мой вкус так лучше!

// Во-первых: для конвертации json файла в xml и наоборот наберите в терминале 
// node index.js node convert example2.json example1.xml
// или node index.js node convert example.xml example2.json
// Таким образом эти файлы конвертируются друг в друга??? Не знаю правильно ли написала)))

// Во-вторых: для конвертации json или xml файла в js наберите в терминале
// node index.js node convert example.xml example3.js
// node index.js node convert example2.json example3.js


import fs from 'fs';
import xml2js from 'xml2js';

const log = console.log;
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();
const args = process.argv.slice(2);

if (args[0] === 'node' && args[1] === 'convert') {
    let sourceFNameArray = args[2].split('.');
    let destinFNameArray = args[3].split('.');

    if(sourceFNameArray[1] === 'json' && 
       destinFNameArray[1] === 'xml')
    {
        fs.readFile(args[2], 'utf8', (err, data) => {
            if(err) throw err;
            data = JSON.parse(data);
            let result = builder.buildObject(data);
            fs.writeFile(args[3],result, (err) => {
                if(err) throw err;
                log(`${args[2]} has been convert and written to ${args[3]}`);
            });
        });
    }
    else if(sourceFNameArray[1] === 'xml' &&
            destinFNameArray[1] === 'json')
    {
        fs.readFile(args[2], 'utf8', (err, data) => {
            if(err) throw err;
            parser.parseString(data, function (err, result) {
                result = JSON.stringify(result, null, 2);
                fs.writeFile(args[3],result, (err) => {
                    if(err) throw err;
                    log(`${args[2]} has been convert and written to ${args[3]}`);
                });
            });
        });
    }
    else if(sourceFNameArray[1] === 'json' &&
            destinFNameArray[1] === 'js')
    {
        fs.readFile(args[2], 'utf8', (err, data) => {
            if(err) throw err;
            fs.writeFile(args[3], `const result = ${data}`, (err) => {
                if(err) throw err;
                log(`${args[2]} has been convert and written to ${args[3]}`);
            });
        });
    }
    else if(sourceFNameArray[1] === 'xml' && 
            destinFNameArray[1] === 'js')
    {
        fs.readFile(args[2], 'utf8', (err, data) => {
            if(err) throw err;
            log(data);
            parser.parseString(data, function (err, result) {
                result = JSON.stringify(result)
                fs.writeFile(args[3], `const result = ${result}`, (err) => {
                    if(err) throw err;
                    log(result);
                    log(`${args[2]} has been convert and written to ${args[3]}`);
                });
            });
        });
    }
    else {
        log("You entered the wrong command.");
    }
}