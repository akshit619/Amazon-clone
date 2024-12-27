export let cart;
loadFromStorage();


export function loadFromStorage(){
    cart =JSON.parse(localStorage.getItem('cart'))
    if(!cart){
        cart=[{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}

function updateLocalStorage(){
    localStorage.removeItem('cart');
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(itemId,selectedQuantity){

    let matchingItem;

    cart.forEach((cartItem) => {
        if(itemId===cartItem.productId){
            matchingItem = cartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity+=selectedQuantity;
    }else{
        cart.push({
            productId: itemId,
            quantity: selectedQuantity,
            deliveryOptionId: '1'
        });
    }

    updateLocalStorage();
}



export function removeFromCart(itemId){
    let newCart=[];

    cart.forEach((item)=>{
        if(item.productId !== itemId){
            newCart.push(item);
        }
    });

    cart = newCart;
    updateLocalStorage();
}

export function calculateCartQuantity(){
    let totalQuantity=0;
    cart.forEach((item) => {
        totalQuantity+=item.quantity;
    });

    return totalQuantity;
}

export function updateQuantity(productId,newQuantity){

    cart.forEach((item) => {
        if(item.productId===productId) item.quantity = newQuantity;
    });
    updateLocalStorage();
}

export function updateDeliveryOption(productId, deliveryId){
    let matchingItem;
    cart.forEach((item)=>{
        if(item.productId===productId){
            matchingItem = item;
        }
    });
    matchingItem.deliveryOptionId = deliveryId;
    updateLocalStorage();
}

export function loadCart(fun){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load',()=>{
    //   console.log(xhr.response);
      fun();
    });
  
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}