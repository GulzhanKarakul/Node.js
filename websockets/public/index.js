let socket = io();
console.log(socket);

let userName = prompt('Your Name?')

let display = document.querySelector('.display');
socket.on('message', (data) => {
    let msg = document.createElement('div');
    msg.className = 'incoming';
    msg.innerText = data.text;
    display.append(msg);
});

let message = document.getElementById('message');
let button = document.getElementById('btn');

button.addEventListener('click', (ev) => {
    ev.preventDefault();
    let msg = message.value;
    console.log(msg);
    if(msg) {
        socket.emit('message', {text: msg, from: userName, chatId: socket.id})
    }
});