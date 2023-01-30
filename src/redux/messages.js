import * as ActionTypes from './ActionTypes';
export const Messages=(state={
    isLoading:true,
    errMess:null,
    messages:[]
}, action)=>{
    switch(action.type){
        case ActionTypes.ADD_MESSAGE:
            var message=action.payload;
            return {...state,isLoading:false,errMess:null,messages:state.messages.concat(message)}
        case ActionTypes.ADD_MESSAGES:
            return {...state,isLoading:false,errMess:null,messages:action.payload};

        case ActionTypes.MESSAGES_LOADING:
            return {...state,isLoading:true,errMess:null,messages:[]};

        case ActionTypes.MESSAGES_FAILED:
            return {...state,isLoading:false,errMess:action.payload,messages:[]};
        default:
            return state;
    }
}