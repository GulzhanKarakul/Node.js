import {store} from "./store.js";

export const dispatcher = {
    dispatch (action) {
        store.dispatch(action);
    }
}