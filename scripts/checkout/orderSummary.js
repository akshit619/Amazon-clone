import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary(){

    updateCartQuantity();

    let cartSummaryHTML = '';
    cart.forEach((item) => {
        let matchingItem;

        products.forEach((product) => {
            if(item.productId === product.id){
                matchingItem = product;
            }
        })

        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if(option.id===item.deliveryOptionId)
                deliveryOption = option;
        });

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        cartSummaryHTML+=`
            <div class="cart-item-container 
           js-cart-item-container js-item-container-${matchingItem.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src=${matchingItem.image}>

                    <div class="cart-item-details">
                        <div class="product-name">
                        ${matchingItem.name}
                        </div>
                        <div class="product-price">
                        $${formatCurrency(matchingItem.priceCents)}
                        </div>
                        <div class="product-quantity 
                        js-product-quantity-${item.productId}">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label-${item.productId}">${item.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-update-id="${item.productId}">
                                Update
                            </span>
                            <input class="quantity-input js-quantity-input-${item.productId}">
                            <span class="save-quantity-link link-primary js-save-quantity-link-${item.productId}">Save</span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${item.productId}" data-product-id="${item.productId}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(item.productId,item.deliveryOptionId)}
                    </div>
                </div>
            </div>
        `
    });


    function deliveryOptionsHTML(itemCartId,itemDeliveryId){

        let html = '';
        
        deliveryOptions.forEach((option)=>{

            const today = dayjs();
            const deliveryDate = today.add(
                option.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );
            const priceString = 
            option.priceCents===0
            ? 'FREE'
            : `$${formatCurrency(option.priceCents)} -`

            const isChecked = option.id===itemDeliveryId;

            html+=`
                <div class="delivery-option js-delivery-option" data-product-id="${itemCartId}" data-option-input-id="${option.id}">
                    <input type="radio" ${isChecked ? 'checked': ''}
                        class="delivery-option-input js-delivery-option-input"  
                        name="delivery-option-${itemCartId}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `
        });

        return html;  
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    function updateCartQuantity(){
        let totalQuantity = calculateCartQuantity();
        document.querySelector('.js-cart-quantity-checkout').innerHTML = totalQuantity + ' items';
    }

    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click',() => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
            updateCartQuantity();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-update-link').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productUpdateId = link.dataset.productUpdateId;
            const container = document.querySelector(`.js-item-container-${productUpdateId}`);

            container.classList.add('is-editing-quantity');

            document.querySelector(`.js-save-quantity-link-${productUpdateId}`).addEventListener('click',() => {
                const inputValue = Number(document.querySelector(`.js-quantity-input-${productUpdateId}`).value);

                if(inputValue>0 && inputValue<1000){
                    document.querySelector(`.js-quantity-label-${productUpdateId}`).innerHTML = inputValue;
                    container.classList.remove('is-editing-quantity');
                    updateQuantity(productUpdateId,inputValue);
                    updateCartQuantity();
                    renderOrderSummary();
                    renderPaymentSummary();
                }else if(inputValue===0){
                    document.querySelector(`.js-quantity-label-${productUpdateId}`).innerHTML = inputValue;
                    setTimeout(()=>{
                        removeFromCart(productUpdateId);
                        updateCartQuantity();
                        renderOrderSummary();
                        renderPaymentSummary();
                    },2000);
                }
            });

            document.querySelector(`.js-quantity-input-${productUpdateId}`).addEventListener('keydown',(event) => {
                const inputValue = Number(document.querySelector(`.js-quantity-input-${productUpdateId}`).value);

                if(event.key === 'Enter'){
                    if(inputValue>0 && inputValue<1000){
                        document.querySelector(`.js-quantity-label-${productUpdateId}`).innerHTML = inputValue;
                        container.classList.remove('is-editing-quantity');
                        updateQuantity(productUpdateId,inputValue);
                        updateCartQuantity();
                        renderOrderSummary();
                        renderPaymentSummary();
                    }else if(inputValue===0){
                        document.querySelector(`.js-quantity-label-${productUpdateId}`).innerHTML = inputValue;
                        setTimeout(()=>{
                            removeFromCart(productUpdateId);
                            updateCartQuantity();
                            renderOrderSummary();
                            renderPaymentSummary();
                        },2000);
                    }
                }
            });
        });
    });


    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, optionInputId} = element.dataset;
            updateDeliveryOption(productId, optionInputId);
            renderOrderSummary(); // recursive nature
            renderPaymentSummary();
        })
    });

}
