import { prompt } from "./test/module.js"

const log = console.log;

//Оба примера работают!

// Пример использования № 1:
prompt("Сколько вам лет?")
  .then(Number)
  .then((val) => {
    const userAge = val;
    log(`Ваш возраст: ${userAge}!`);
});

// // Пример использования № 2:
// async function getUserAge() {
//   const userIn = await prompt("How old are you?");
//   const userAge = Number(userIn);
//   log(`User age: ${userAge}!`);
// }

// getUserAge();
