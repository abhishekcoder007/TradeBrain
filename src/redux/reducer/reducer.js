
import {combineReducers} from "redux";

export const reducer=(state=0,action)=>{

    switch(action.type){
        case "inc": return state+1;
        default:return state;
    }
}
export const cartData=(state=[],action)=>{

    switch(action.type){
        case "addData": return [...state,...action.payload];
        case "delete": return state.filter(ele=>ele.symbol!==action.payload)
        case "newDataadd": return [...state,action.payload];
        default:return state;
    }
}

export const rootReducer=combineReducers({
    reducer,
    cartData,
})