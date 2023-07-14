
export class CountView {
    constructor(store) {
        this.store = store;
        this.store.subscribe(this.render);
        this.render();
    }

    render = () => {
        const countElement = document.querySelector('.count');
        let number = this.store.getState();
        console.log(number)
        countElement.textContent = number.count.toString();
    }
    
}