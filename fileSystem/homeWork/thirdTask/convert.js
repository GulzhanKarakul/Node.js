// Виталий, я прикола ради сделала еще в константу чтобы в js файл еще записывался объект...

// ГОТОВЫЕ ПРИМЕРЫ:
// Во-первых: для конвертации json файла в xml и наоборот
// node convert.js example2.json example1.xml
// или node convert.js example.xml example.json

// Во-вторых: для конвертации json или xml файла в js
// node convert.js example.xml example3.js
// node convert.js example2.json example3.js

import fs from 'fs';
import xml2js from 'xml2js';

const log = console.log;
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();
const args = process.argv.slice(2);

// VN: лучше сразу достать sourceFName и destinFName из массива args
// Иначе строк через 50 запись args[1] уже перестанет быть лёгкой для чтения.
// И sourceType, destinType тоже можно сразу достать

let sourceFNameArray = args[0].split('.');
let destinFNameArray = args[1].split('.');

// VN: здесь притаилась опсность: а что если файл будет называться, например, так: local.users.exported_01.json

if(sourceFNameArray[1] === 'json' && 
   destinFNameArray[1] === 'xml')
{
    fs.readFile(args[0], 'utf8', (err, data) => {
        if(err) throw err;
        data = JSON.parse(data);
        let result = builder.buildObject(data);
        fs.writeFile(args[1],result, (err) => {
            if(err) throw err;
            log(`${args[0]} has been convert and written to ${args[1]}`);
        });
    });
}
else if(sourceFNameArray[1] === 'xml' &&
        destinFNameArray[1] === 'json')
{
    fs.readFile(args[0], 'utf8', (err, data) => {
        if(err) throw err;
        parser.parseString(data, function (err, result) {
            result = JSON.stringify(result, null, 2);
            fs.writeFile(args[1],result, (err) => {
                if(err) throw err;
                log(`${args[0]} has been convert and written to ${args[1]}`);
            });
        });
    });
}
else if(sourceFNameArray[1] === 'json' &&
        destinFNameArray[1] === 'js')
{
    fs.readFile(args[0], 'utf8', (err, data) => {
        if(err) throw err;
        fs.writeFile(args[1], `const result = ${data}`, (err) => {
            if(err) throw err;
            log(`${args[0]} has been convert and written to ${args[1]}`);
        });
    });
}
else if(sourceFNameArray[1] === 'xml' && 
        destinFNameArray[1] === 'js')
{
    fs.readFile(args[0], 'utf8', (err, data) => {
        if(err) throw err;
        log(data);
        parser.parseString(data, function (err, result) {
            result = JSON.stringify(result)
            fs.writeFile(args[1], `const result = ${result}`, (err) => {
                if(err) throw err;
                log(result);
                log(`${args[0]} has been convert and written to ${args[1]}`);
            });
        });
    });
}
else {
    log("You entered the wrong command.");
}