import * as actions from './actions.js';
import {dispatcher} from './dispatcher.js';
import { CountView } from './view.js';
import { store } from './store.js';

const incrementButton = document.getElementById("incr");
const decrementButton = document.getElementById("decr");
const clearButton = document.getElementById('clear');

incrementButton.addEventListener("click",()=>{
    dispatcher.dispatch(actions.increment());
});

decrementButton.addEventListener("click",()=>{
    dispatcher.dispatch(actions.decrement());
});

clearButton.addEventListener("click",()=>{
    dispatcher.dispatch(actions.clear());
});

let view = new CountView(store);

let list = document.getElementById('list');
let addItemBtn = document.getElementById('add-item-btn');
let subPanel = document.querySelectorAll('.sub-panel');

addItemBtn.addEventListener('click', () => {
    dispatcher.dispatch(actions.add());
});
  

// Обработчик нажатия на кнопку добавления нового элемента
addItemBtn.addEventListener('click', function(event) {
  // Получаю текст нового элемента из поля ввода
  let newItemText = document.getElementById('new-item-text').value;
  console.log(newItemText);

  // Если поле ввода пустое, новый элемент не добавляется
  if (!newItemText) {
    return;
  }

  // Получаю ли и клонирую ее
  let li = document.querySelector('li');
  let newLi = li.cloneNode(true);
  // Меняю текст внутри на инпут
  newLi.querySelector('.item').textContent = newItemText;
  //Добавляю новую ли
  list.append(newLi);

  // Очищаю поле ввода
  document.getElementById('new-item-text').value = '';
});
