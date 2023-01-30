import * as ActionTypes from './ActionTypes';
import {baseUrl} from "../shared/baseUrl";

//PRODUCT FUNCTIONS
export const addProduct=(product)=>({
    type:ActionTypes.ADD_PRODUCT,
    payload:product
});
export const postProduct=(productName,category,description,application,quantity,price,image)=>(dispatch)=>{
    const newProduct={
            name:productName,
            category:category,
            description:description,
            image:image,
            application:application,
            quantity:quantity,
            price:price
    };
    return fetch(baseUrl+'products/',{
        method:'POST',
        body: JSON.stringify(newProduct),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(addProduct(response));console.log(response)})
    .catch(error=>{ console.log("Post Products ",error.message);
            alert("Your Product could not be added\nError: "+error.message);});
}
export const deleteProduct=(productId)=>(dispatch)=>{
    //alert(productId);
    return fetch(baseUrl+'products/'+productId,{
        method:'DELETE',
        
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        console.log("testttt123")
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(fetchProducts())})
    .catch(error=>{ console.log("Delete Products ",error.message);
            alert("Your Product could not be deleted\nError: "+error.message);});
}
export const putProduct=(id,productName,category,description,application,quantity,price,image)=>(dispatch)=>{
    dispatch(productsLoading(true))
    const updatedProduct={
            name:productName,
            category:category,
            description:description,
            image:image,
            application:application,
            quantity:quantity,
            price:price
    };
    return fetch(baseUrl+'products/'+id,{
        method:'PUT',
        body: JSON.stringify(updatedProduct),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(fetchProducts())})
    .catch(error=>{ console.log("Put Products ",error.message);
            alert("Your Product could not be updated\nError: "+error.message);});
}
export const fetchProducts=()=>(dispatch)=>{
    dispatch(productsLoading(true));
   return fetch(baseUrl+"products")
   .then(response=>{
       if(response.ok){
           return response;
       }else{
           var error=new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
   },
   error=>{
       var errmess=new Error(error.message);
       throw errmess;
   })
   .then(response=>response.json())
   .then(products=>dispatch(addProducts(products)))
   .catch(error=>dispatch(productsFailed(error.message)));


}


export const productsLoading=()=>({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed=(errmess)=>({
    type:ActionTypes.PRODUCTS_FAILED,
    payload:errmess
});
export const addProducts=(products)=>({
    type: ActionTypes.ADD_PRODUCTS,
    payload:products
});



//CATEGORY FUNCTIONS
export const deleteCategory=(categoryId)=>(dispatch)=>{
    return fetch(baseUrl+'categories/'+categoryId,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(fetchCategories())})
    .catch(error=>{ console.log("Delete Categories ",error.message);
            alert("This Category could not be deleted\nError: "+error.message);});
}

export const addCategory=(category)=>({
    type:ActionTypes.ADD_CATEGORY,
    payload:category
});
export const postCategory=(categoryName)=>(dispatch)=>{
    const newCategory={
      description:categoryName
    };
    return fetch(baseUrl+"categories",{
        method:'POST',
        body: JSON.stringify(newCategory),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>dispatch(addCategory(response)))
    .catch(error=>{ console.log("Post Category ",error.message);
            alert("Your Category could not be added\nError: "+error.message);});
}

export const fetchCategories=()=>(dispatch)=>{
    dispatch(categoriesLoading(true));
   return fetch(baseUrl+"categories")
   .then(response=>{
    if(response.ok){
        return response;
    }else{
        var error=new Error('Error '+response.status+': '+response.statusText);
         error.response=response;
         throw error;
     }
},
error=>{
    var errmess=new Error(error.message);
    throw errmess;
})
   .then(response=>response.json())
   .then(categories=>dispatch(addCategories(categories)))
   .catch(error=>dispatch(categoriesFailed(error.message)));
;
    
}
export const categoriesLoading=()=>({
    type: ActionTypes.CATEGORIES_LOADING
});
export const categoriesFailed=(errmess)=>({
    type:ActionTypes.CATEGORIES_FAILED,
    payload:errmess
});
export const addCategories=(categories)=>({
    type: ActionTypes.ADD_CATEGORIES,
    payload:categories
});

//CART FUNCTIONS
export const addToCart=(productId)=>({
    type:ActionTypes.ADD_TO_CART,
    payload:{
        productId:productId
    }

})
export const removeFromCart=(productId)=>({
    type:ActionTypes.REMOVE_FROM_CART,
    payload:{
        productId:productId
    }

})
export const adjust_qty=(productId,value)=>({
    type:ActionTypes.ADJUST_QTY_CART,
    payload:{
        productId:productId,
        quantity:value
    }

})
export const loadCurrentItem=(product)=>({
    type:ActionTypes.LOAD_CURRENT_ITEM,
    payload:product
});

//MESSAGES FUNCTIONS

export const fetchMessages=()=>(dispatch)=>{
    dispatch(messagesLoading(true));
   return fetch(baseUrl+"messages")
   .then(response=>{
       if(response.ok){
           return response;
       }else{
           var error=new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
   },
   error=>{
       var errmess=new Error(error.message);
       throw errmess;
   })
   .then(response=>response.json())
   .then(messages=>dispatch(addMessages(messages)))
   .catch(error=>dispatch(messagesFailed(error.message)));


}


export const messagesLoading=()=>({
    type: ActionTypes.MESSAGES_LOADING
});

export const messagesFailed=(errmess)=>({
    type:ActionTypes.MESSAGES_FAILED,
    payload:errmess
});
export const addMessages=(messages)=>({
    type: ActionTypes.ADD_MESSAGES,
    payload:messages
});

export const addMessage=(message)=>({
    type:ActionTypes.ADD_MESSAGE,
    payload:message
});
export const postMessage=(firstName,lastName,telnum,email,flag,contactMethod,message)=>(dispatch)=>{
    const newMessage={
            firstName:firstName,
            lastName:lastName,
            telnum:telnum,
            email:email,
            flag:flag,
            contactMethod:contactMethod,
            message:message
    };
    newMessage.date = new Date().toDateString();
    return fetch(baseUrl+'messages',{
        method:'POST',
        body: JSON.stringify(newMessage),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(addMessage(response))})
    .catch(error=>{ console.log("Post Message ",error.message);
            alert("Your Message could not be sent\nError: "+error.message);});
}
export const deleteMessage=(messageId)=>(dispatch)=>{
    return fetch(baseUrl+'messages/'+messageId,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(fetchMessages())})
    .catch(error=>{ console.log("Delete Message ",error.message);
            alert("This Message could not be deleted\nError: "+error.message);});
}


//USERS FUNCTIONS


export const fetchUsers=()=>(dispatch)=>{
    dispatch(usersLoading(true));
   return fetch(baseUrl+"users")
   .then(response=>{
    if(response.ok){
        return response;
    }else{
        var error=new Error('Error '+response.status+': '+response.statusText);
         error.response=response;
         throw error;
     }
},
error=>{
    var errmess=new Error(error.message);
    throw errmess;
})
   .then(response=>response.json())
   .then(users=>dispatch(addUsers(users)))
   .catch(error=>dispatch(usersFailed(error.message)));
;
    
}


export const usersLoading=()=>({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed=(errmess)=>({
    type:ActionTypes.USERS_FAILED,
    payload:errmess
});
export const addUsers=(users)=>({
    type: ActionTypes.ADD_USERS,
    payload:users
});
export const postUser=(firstName,lastName,password,email,telnum,dateOfBirth)=>(dispatch)=>{
    const newUser={
            firstName:firstName,
            lastName:lastName,
            password:password,
            email:email,
            telnum:telnum,
            dateOfBirth:dateOfBirth,
    };
    newUser.type = 0;
    newUser.dateOfDelete=null;
    return fetch(baseUrl+'users',{
        method:'POST',
        body: JSON.stringify(newUser),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(user=>{dispatch(addUser(user));dispatch(login(user))})
    .catch(error=>{ console.log("Sign up ",error.message);
            alert("You couldn't Sign up\nError: "+error.message);});
}
export const putUser=(id,firstName,lastName,password,email,telnum,dateOfBirth)=>(dispatch)=>{
    const updatedUser={
            firstName:firstName,
            lastName:lastName,
            password:password,
            email:email,
            telnum:telnum,
            dateOfBirth:dateOfBirth,
    };
    updatedUser.type = 0;
    updatedUser.dateOfDelete=new Date().toDateString();
    return fetch(baseUrl+'users/'+id,{
        method:'PUT',
        body: JSON.stringify(updatedUser),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(user=>{dispatch(fetchUsers())})
    .catch(error=>{ console.log("Delete User Error ",error.message);
            alert("The user couldn't be deleted\nError: "+error.message);});
}
export const addUser=(user)=>({
    type:ActionTypes.ADD_USER,
    payload:user
});


export const login=(user)=>({
    type:ActionTypes.LOGIN,
    payload:user
});
export const logout=()=>({
    type:ActionTypes.LOGOUT
});

//ORDERS FUNCTIONS

export const addOrder=(order)=>({
    type:ActionTypes.ADD_ORDER,
    payload:order
});
export const postOrder=(userId,city,details,floor,contactMethod,addComments,totalPrice)=>(dispatch)=>{
    const newUser={
            userId:userId,
            city:city,
            details:details,
            floor:floor,
            contactMethod:contactMethod,
            addComments:addComments,
            totalPrice:totalPrice,
    };
    newUser.date=new Date().toDateString();
    return fetch(baseUrl+'orders',{
        method:'POST',
        body: JSON.stringify(newUser),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(user=>{dispatch(addOrder(user))})
    .catch(error=>{ console.log("Post Order ",error.message);
            alert("Your Order Couldn't be placed\nError: "+error.message);});
}


export const fetchOrders=()=>(dispatch)=>{
    dispatch(ordersLoading(true));
   return fetch(baseUrl+"orders")
   .then(response=>{
    if(response.ok){
        return response;
    }else{
        var error=new Error('Error '+response.status+': '+response.statusText);
         error.response=response;
         throw error;
     }
},
error=>{
    var errmess=new Error(error.message);
    throw errmess;
})
   .then(response=>response.json())
   .then(orders=>dispatch(addOrders(orders)))
   .catch(error=>dispatch(ordersFailed(error.message)));
;
    
}
export const ordersLoading=()=>({
    type: ActionTypes.ORDERS_LOADING
});
export const ordersFailed=(errmess)=>({
    type:ActionTypes.ORDERS_FAILED,
    payload:errmess
});
export const addOrders=(orders)=>({
    type: ActionTypes.ADD_ORDERS,
    payload:orders
});
export const deleteOrder=(orderId)=>(dispatch)=>{
    return fetch(baseUrl+'orders/'+orderId,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(fetchOrders())})
    .catch(error=>{ console.log("Delete Order ",error.message);
            alert("This Order could not be deleted\nError: "+error.message);});
}



//PRODORDER FUNCTIONS

export const addProdOrder=(prodorder)=>({
    type:ActionTypes.ADD_PRODORDER,
    payload:prodorder
});
export const postProdOrder=(orderId,productId,productPrice,quantity)=>(dispatch)=>{
    const newProdOrder={
            orderId:orderId,
            productId:productId,
            productPrice:productPrice,
            quantity:quantity
    };
    return fetch(baseUrl+'prodorder',{
        method:'POST',
        body: JSON.stringify(newProdOrder),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(addProdOrder(response))})
    .catch(error=>{ console.log("Post ProdOrder ",error.message);
            alert("Your Order details couldn't be added\nError: "+error.message);});
}


export const fetchProdOrders=()=>(dispatch)=>{
    dispatch(prodOrdersLoading(true));
   return fetch(baseUrl+"prodorder")
   .then(response=>{
       if(response.ok){
           return response;
       }else{
           var error=new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
   },
   error=>{
       var errmess=new Error(error.message);
       throw errmess;
   })
   .then(response=>response.json())
   .then(prodOrders=>dispatch(addProdOrders(prodOrders)))
   .catch(error=>dispatch(prodOrdersFailed(error.message)));


}
export const deleteProdOrder=(prodOrderId)=>(dispatch)=>{
    return fetch(baseUrl+'prodorder/'+prodOrderId,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'same-origin'
    }).then(response=>{
        if(response.ok){
            return response;
        }else{
            var error=new Error('Error '+response.status+': '+response.statusText);
             error.response=response;
             throw error;
         }
    },
    error=>{
        var errmess=new Error(error.message);
        throw errmess;
    }).then(response=>response.json())
    .then(response=>{dispatch(fetchProdOrders())})
    .catch(error=>{ console.log("Delete ProdOrder ",error.message);
            alert("This ProdOrder could not be deleted\nError: "+error.message);});
}


export const prodOrdersLoading=()=>({
    type: ActionTypes.PRODORDERS_LOADING
});

export const prodOrdersFailed=(errmess)=>({
    type:ActionTypes.PRODORDERS_FAILED,
    payload:errmess
});
export const addProdOrders=(prodOrders)=>({
    type: ActionTypes.ADD_PRODORDERS,
    payload:prodOrders
});

