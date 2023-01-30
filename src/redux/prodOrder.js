import * as ActionTypes from './ActionTypes';
export const ProdOrder=(state={
    isLoading:true,
    errMess:null,
    prodOrder:[]
}, action)=>{
    switch(action.type){
        case ActionTypes.ADD_PRODORDER:
            var el=action.payload;
            return {...state,isLoading:false,errMess:null,prodOrder:state.prodOrder.concat(el)}
        case ActionTypes.ADD_PRODORDERS:
            return {...state,isLoading:false,errMess:null,prodOrder:action.payload};

        case ActionTypes.PRODORDERS_LOADING:
            return {...state,isLoading:true,errMess:null,prodOrder:[]};

        case ActionTypes.PRODORDERS_FAILED:
            return {...state,isLoading:false,errMess:action.payload,prodOrder:[]};
        default:
            return state;
    }
}