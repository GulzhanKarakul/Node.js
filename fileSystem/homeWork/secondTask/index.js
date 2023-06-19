const log = console.log;

import fs from 'fs';

function main() {
    fs.readFile("data.json", 'utf8', (err, data) => {
        if(err) throw err;
        const obj = JSON.parse(data);
        log('Count : ' + obj['count']);
        obj['count'] += 1;
        const jsonObj = JSON.stringify(obj);
        fs.writeFile('data.json', jsonObj, (err) => {
            if(err) throw err;
            log(jsonObj);
        });
    });
}

main();