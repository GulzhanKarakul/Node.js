import express from "express";
import path from 'path';

const __dirname = process.cwd();
    const log = console.log;

log(__dirname);

const app = express();
app.use(express.static("public") );


app.get('/', async (req, res) => {
    let file = path.join(__dirname, '/public/index.html');
    res.sendFile(file);
    // res.end();
});


// Error function
function handleError(err, response) {
    response.writeHead(500, { "Content-Type": "text/html; charset=utf-8"});
    response.write(`<h1>Error: ${err.message}</h1>`, "utf-8");
    response.end();
}

app.listen(3000, () => {
    console.log("server is runnning port 3000"); 
});

//http://locAlhost:3000