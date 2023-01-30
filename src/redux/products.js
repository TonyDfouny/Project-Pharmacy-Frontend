
import * as ActionTypes from'./ActionTypes';


export const Products=(state={
    isLoading:true,
    errMess:null,
    products:[],
    cart:[],
    currentProduct:[]
}, action)=>{
    switch(action.type){
        case ActionTypes.ADD_PRODUCT:
            var product=action.payload;
            return {...state,isLoading:false,errMess:null,products:state.products.concat(product)}
        case ActionTypes.ADD_PRODUCTS:
            return {...state,isLoading:false,errMess:null,products:action.payload};

        case ActionTypes.PRODUCTS_LOADING:
            return {...state,isLoading:true,errMess:null,products:[]};

        case ActionTypes.PRODUCTS_FAILED:
            return {...state,isLoading:false,errMess:action.payload,products:[]};
        case ActionTypes.ADD_TO_CART:
            console.log("add to cart applied");
            const item=state.products.find(prod=>prod._id===action.payload.productId);
            console.log("aaaa");
            const inCart=state.cart.find((item)=>item._id===action.payload.productId)?true:false;
            
            return {...state,cart:inCart?
                state.cart.map((item)=>item._id===action.payload.productId?{...item,quantity:item.quantity+1}:item)
                :[...state.cart,{...item,quantity:1}],
            }
        case ActionTypes.REMOVE_FROM_CART:
            return {...state,
            cart:state.cart.filter(item=>item._id!==action.payload.productId)};

        case ActionTypes.ADJUST_QTY_CART:
            return {...state,
            cart:state.cart.map(item=>item._id===action.payload.productId?{...item,quantity:+action.payload.quantity}:item)};

        case ActionTypes.LOAD_CURRENT_ITEM:
            return {...state,currentProduct:action.payload};
            
        default:
            return state;
    }
}