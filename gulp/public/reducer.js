import { types } from "./actions.js";

const initialState = {count:0};

export function countReducer (state = initialState, action){
    if(!action) return state;
    switch (action.type) {
        case types.INCREMENT:
            return{count: state.count+1};
        case types.DECREMENT:
            return{count: state.count-1};
        case types.CLEAR:
            return{count: 0};
        default:
            return state;
    }
}

export function listReducer(action) {

}