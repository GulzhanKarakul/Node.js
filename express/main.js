import express from "express";
import path from 'path';

const __dirname = process.cwd();
const log = console.log;

log(__dirname);

const app = express()

app.get('/', (req, res) => {
    // let file = path.join(__dirname, 'index');
    res.sendFile(path.join(__dirname, 'index.html'));
    // res.end();
});

// app.get('/', function (req, res) {
//     res.send('Hello World');
// });

app.listen(3000, () => {
    console.log("server is runnning port 3000"); 
});

//http://locAlhost:3000