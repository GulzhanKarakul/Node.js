const prompt = require("prompt-sync")();

const log = console.log;

// log('Hello, whats your name?');

let userName = prompt("Hello, whats your name?");
log(`Nice to meet you, ${userName}`);