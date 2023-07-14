import * as reducer from './reducer.js';


function createStore(reducer){
    let state = reducer();
    let listeners =[];

    function dispatch(action){
        state = reducer(state,action);
        notifyListeners();
    }

    function notifyListeners(){
        listeners.forEach((listener)=>{
            listener();
        })
    }

    function subscribe(listener){
        listeners.push(listener);
    }

    function getState(){
        return state;
    };

    return{
        getState,
        dispatch,
        subscribe,
    }
}

export const store = createStore(reducer.countReducer);