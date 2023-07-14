export const types = {
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
    CLEAR: "CLEAR",
    ADD: "ADD",
    UP: 'UP',
    DOWN: 'DOWN',
    REMOVE: "REMOVE",
}

export function increment() {
    return {
        type: types.INCREMENT
    };
}

export function decrement() {
    return {
        type: types.DECREMENT
    };
}

export function clear() {
    return {
        type: types.CLEAR
    };
}

export function add(inputValue) {
    return {
        type: types.ADD,
        text: inputValue,
    };
}

export function up(listValue) {
    return {
        type: types.UP,
        text: listValue,
    };
}

export function down(listValue) {
    return {
        type: types.DOWN,
        text: listValue,
    };
}

export function remove(listValue) {
    return {
        type: types.REMOVE,
        text: listValue,
    };
}