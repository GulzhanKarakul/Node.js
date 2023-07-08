import express from 'express'; 
import http from 'http'; 
import { Server as Io } from "socket.io"; 
import path from 'path'; 
 
const app = express(); 
const server = http.createServer(app); 
const io = new Io(server); 
 
app.use(express.static('public')); 
 
app.get('/', (req, res) => { 
    const fname = path.join(process.cwd(), 'public', 'index.html'); 
    res.sendFile(fname); 
 
}); 
 
io.on('connection', (socket) => { 
    console.log('a user connected', socket.id); 
}); 
 
server.listen(3000, () => { 
    console.log('listening on*:3000') 
}); 
 
io.on('connection', (socket) => { 
    console.log("connected:", socket.id); 
    socket.emit("message", { text: "Welcome!", chatId: socket.id }); 
    socket.on("message", (data) => { 
        socket.emit("message", data); 
    }) 
});