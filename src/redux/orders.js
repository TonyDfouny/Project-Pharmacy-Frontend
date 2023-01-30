import * as ActionTypes from './ActionTypes';
export const Orders=(state={
    isLoading:true,
    errMess:null,
    orders:[]
}, action)=>{
    switch(action.type){
        case ActionTypes.ADD_ORDER:
            var order=action.payload;
            return {...state,isLoading:false,errMess:null,orders:state.orders.concat(order)}
        case ActionTypes.ADD_ORDERS:
            return {...state,isLoading:false,errMess:null,orders:action.payload};

        case ActionTypes.ORDERS_LOADING:
            return {...state,isLoading:true,errMess:null,orders:[]};

        case ActionTypes.ORDERS_FAILED:
            return {...state,isLoading:false,errMess:action.payload,orders:[]};
        default:
            return state;
    }
}