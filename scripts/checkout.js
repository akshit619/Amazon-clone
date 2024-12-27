import { loadCart } from '../data/cart.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import {renderOrderSummary} from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import '../data/car.js';

async function loadPage(){
    try{
        await loadProductsFetch();

        await new Promise((resolve)=>{
            loadCart(()=>{
                resolve();
            });
        });


    } catch {
        console.log('Unexpected error. Please try again later.');
    }
    

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
Promise.all([ // array of promises, waits to finish all the promises inside the array
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    });
}).then(()=>{
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/



// loadProducts(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });
