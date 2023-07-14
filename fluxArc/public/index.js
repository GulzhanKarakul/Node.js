// Виталий, все работает! Но я ничего в итоге не читала после Вашего объяснения на счет initialState
// В общем я сделала все на свой лад, силой своего ума)))) 
// Так что думаю относительно того как надо именно писать во flux-arc  у меня не написано
// Но тем не менее работает)))))

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

let addItemBtn = document.getElementById('add');
addItemBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let newListItem = document.getElementById('new-item-text');
    const text = newListItem.value.trim();

    if (text !== '') dispatcher.dispatch(actions.add(text));
    newListItem.value = '';
});