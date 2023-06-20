const log = console.log;
import Event from "events";
const EventEmitter = Event.EventEmitter;

class UserInputEmitter extends EventEmitter {
    constructor(){
      super();
    }
  
    start() {
        process.stdin.on('data', (data) => {
            const input = data.trim();
  
            if (input === 'exit') {
                this.emit('exit');
            } else if (input.startsWith('solve')) {
                this.emit('solve', input.substr('solve'.length));
            } else {
                this.emit('input', input);
            }
        });
    }

    stop() {
        process.stdin.removeAllListeners('data');
    }
}
// Создаю свой модуль событий
const userInput = new UserInputEmitter();

// Создаю событие input
userInput.on("input", (string) => {
    log(string);
});
// Cоздаю событие solve
userInput.on("solve", (string) => {
    const action = '+-*/';

    let numberOne, numberTwo;
    let currentAction = '';
    for(let x of string){
        for(let z of action){
            if(x === z){
                let arrayOfNumbers = string.split(x);
                numberOne = +(arrayOfNumbers[0].trim());
                numberTwo = +(arrayOfNumbers[1].trim());
                currentAction = x;
            }
        }
    }

    switch(currentAction){
        case '+': 
            log(numberOne + numberTwo);
        break;
        case '-': 
            log(numberOne - numberTwo);
        break;
        case '*': 
            log(numberOne * numberTwo);
        break;
        case '/':
            log((numberOne / numberTwo).toFixed(2));
        break;
        default:
            log("К сожалению такого оператора нет!");
    }
});
// Создаю событие exit
userInput.on("exit", () => {
    userInput.stop();
    process.exit();
});

userInput.start();