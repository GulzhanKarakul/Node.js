const log = console.log;

import fs from 'fs';
import { prompt } from "./module.js";

async function main() {
    const name = await prompt('Hello, what\'s your name?');
    const lastName = await prompt('And what\'s your last name?');
    const birthDate = await prompt('And what\'s your birth date?');
  
    const fileName = await prompt('Please enter the file name:');
    try {
        //await fs.promises.writeFile(...): 
        //Мы используем await для ожидания завершения асинхронной операции записи файла, 
        //вызывая fs.promises.writeFile(). fs.promises - это объект, 
        //который предоставляет промисифицированные (возвращающие промис) версии функций модуля fs. writeFile() 
        //это метод для записи данных в файл. Мы передаем ему имя файла (fileName) и содержимое файла (строку с данными).
        await fs.promises.appendFile(
            fileName,
            `Name: ${name}\nSurname: ${lastName}\nBirth date: ${birthDate}\n`
        );
        log(`Data has been written to ${fileName}`);
    } catch (err) {
        throw err;
    }
    
    process.exit(); // Выход из процесса Без него не работает корректно
}
  
main();