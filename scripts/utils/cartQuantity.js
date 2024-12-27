import {cart} from '/Users/akshitbarnwal/Desktop/javascript-amazon-project-main/data/cart.js';


export function updateCartQuantity(){
    let totalQuantity=0;
    cart.forEach((item) => {
        totalQuantity+=item.cartItemQuantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML =  totalQuantity;
}