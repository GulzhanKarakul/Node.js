import http from "http";
import url from "url";
import fs from "fs";
 
const log = console.log;

const server = http.createServer( (req,res) => {
    let currentUrl = url.parse(req.url);
    let params = new URLSearchParams(currentUrl.search);
    let data;
    switch(currentUrl.pathname){
        case "/":
            data = fs.readFileSync('./index.html', "utf8");
            res.statusCode = 200;
            res.write(data);
            break;

        case "/users":
            let name = params.get("name");
            if(name){
                data = fs.readFileSync('./users.html', "utf8");
                data = data.replace("%name%", name);
                res.statusCode = 200;
                res.write(data);
            }else {
                res.statusCode = 403;
                res.statusMessage = "Wrong request";
            }
            break;

        case "/get":
            data = fs.readFileSync('./index.html', "utf8");
            let data2 = fs.readFileSync('./users.json', "utf8");
            data.append(data2);
            log(data2);
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.write(data);
            break;
        case "/feedback":
            data = fs.readFileSync('./feedback.html', "utf8");
            res.statusCode = 200;
            res.write(data);
            break;
        case "/favicon.ico":
            break;
        default: 
        res.statusCode = 404;
        res.statusMessage = "Not Found";
    }
    res.end();
    console.log(params); 
    // res.end(my_html); 
}); 
server.listen(3000, () => { 
    console.log("server is runnning port 3000"); 
})

//http://locAlhost:300