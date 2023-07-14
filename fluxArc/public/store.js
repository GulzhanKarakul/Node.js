import * as reducer from './reducer.js';

function createStore(reducer){
    let stateNum = reducer.countReducer();
    let stateUl = reducer.listReducer();
    let listeners =[];

    function dispatch(action){
        if(action.type == 'INCREMENT'  || 
           action.type == 'DECREMENT' ||
           action.type == 'CLEAR') {
            stateNum = reducer.countReducer(stateNum,action);
        } else stateUl = reducer.listReducer(stateUl,action);
        
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

    function getCounterState(){
        return stateNum;
    };

    function getUlState(){
        return stateUl;
    };

    return{
        getCounterState,
        getUlState,
        dispatch,
        subscribe,
    }
}

export const store = createStore(reducer);