import { prompt } from "./test/module.js"

const log = console.log;

// Пример использования № 1: Number
prompt("Сколько вам лет?", 2)
  .then((val) => {
    const userAge = val;
    log(`Ваш возраст: ${userAge}!`);
});

// // Пример использования № 2: Float
// async function getUserWeight() {
//     const userIn = await prompt("Какой у вас вес?", 0.0);
//     log(`Ваш вес: ${userIn}!`);
// }

// getUserWeight();

// //  Пример использования № 3: String
// prompt("Как вас зовут?", "no name")
//   .then((val) => {
//     const userName = val;
//     log(`Приятно Познакомиться: ${userName}!`);
// });

// //  Пример использования № 4: Boolean
// async function getUserGender() {
//     const userIn = await prompt("Вы женского пола?", true);
//     if(userIn) log("Вы женщина!");
//     else log('Вы мужчина!');
// }

// getUserGender();

// //  Пример использования № 4: Array
// prompt("Сколько людей у тебя в семье, назови каждого?", ['Папа', 'Мама', 'я'])
//   .then((val) => {
//     const userFamilyArray = val;
//     log(`В твоей семье есть: ${userFamilyArray}!`);
// });