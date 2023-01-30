
import * as ActionTypes from './ActionTypes';
export const Auth=(state={
    signed:false,
    currentUser:[],
    type:null,
}, action)=>{
    switch(action.type){
        case ActionTypes.LOGIN:
            var user=action.payload;
            return {...state,signed:true,currentUser:user,type:user.type}
        case ActionTypes.LOGOUT:
            return {...state,signed:false,currentUser:[],type:null};
        default:
            return state;
    }
}