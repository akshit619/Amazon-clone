import { calculateCartQuantity, cart} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
function totalCartItemsCost(){
    let cost = 0;
    cart.forEach((item)=>{
        products.forEach((product)=>{
            if(item.productId===product.id){
                cost+=(product.priceCents*item.quantity)
            }
        });
    });
 
    return Number((cost/100).toFixed(2));
}
 
function calculateShippingCost(){
    let cost = 0;
    let shippingCostArray=[];
    cart.forEach((item)=>{
        deliveryOptions.forEach((option) => {
            if(option.id===item.deliveryOptionId)
                if(!shippingCostArray.includes(option.priceCents))
                    shippingCostArray.push(option.priceCents);
        });
    });

    shippingCostArray.forEach((price) => {
        cost+=price;
    })

    return Number((cost/100).toFixed(2));
}

export function renderPaymentSummary(){
    let html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row js-items-summary">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${totalCartItemsCost()}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${calculateShippingCost()}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax()}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimatedTax()}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${orderTotal()}</div>
        </div>

        <button class="place-order-button button-primary js-order-button">
            Place your order
        </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = html;


    function totalBeforeTax(){
        return Number((totalCartItemsCost()+calculateShippingCost()).toFixed(2));
    }

    function estimatedTax(){
        return Number((totalBeforeTax()/10).toFixed(2))
    }

    function orderTotal(){
        return Number(totalBeforeTax()+estimatedTax()).toFixed(2);
    }

    document.querySelector('.js-order-button').addEventListener('click',async () => {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: cart
            })
            });
    
            const order = await response.json();
            addOrder(order);
        }catch(error){
            console.log('Unexpected error. Please try again later.');
        }
        

        window.location.href = 'orders.html';
    });



}