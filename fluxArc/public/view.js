import {dispatcher} from './dispatcher.js';
import * as actions from './actions.js';

export class CountView {
    constructor(store) {
        this.store = store;
        this.store.subscribe(this.render);
        this.store.subscribe(this.listRender);
        this.render();
        this.listRender();
    }

    render = () => {
        const countElement = document.querySelector('.count');
        let state = this.store.getCounterState();
        countElement.textContent = state.count;
    }

    listRender = () => {
        let unorderedList = document.querySelector('ul');
        unorderedList.innerHTML = '';
        let state = this.store.getUlState();

        for(let listValue of state.ul){
            const listItem = document.createElement('li');
            const divItem = document.createElement('div');
            divItem.className = 'item';
            divItem.textContent = listValue;

            const subPanel = document.createElement('div');
            subPanel.className = 'sub-panel';
            const upBtn = document.createElement('button');
            upBtn.id = 'up';
            upBtn.textContent = 'UP';
            upBtn.addEventListener('click', () => {
                let parentEl = upBtn.closest('.sub-panel');
                let siblEl = parentEl.previousSibling;
                let text = siblEl.textContent;

                dispatcher.dispatch(actions.up(text));
            });

            const downBtn = document.createElement('button');
            downBtn.id = 'down';
            downBtn.textContent = 'DOWN';
            downBtn.addEventListener('click', () => {
                let parentEl = downBtn.closest('.sub-panel');
                let siblEl = parentEl.previousSibling;
                let text = siblEl.textContent;

                dispatcher.dispatch(actions.down(text));
            });

            const clearBtn = document.createElement('button');
            clearBtn.id = 'clear';
            clearBtn.textContent = 'X';
            clearBtn.addEventListener('click', () => {
                let parentEl = clearBtn.closest('.sub-panel');
                let siblEl = parentEl.previousSibling;
                let text = siblEl.textContent;
                
                dispatcher.dispatch(actions.remove(text));
            });

            subPanel.append(upBtn);
            subPanel.append(downBtn);
            subPanel.append(clearBtn);

            listItem.append(divItem);
            listItem.append(subPanel);

            unorderedList.append(listItem);
        }
        
    }
}