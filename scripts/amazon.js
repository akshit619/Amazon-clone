import {addToCart, calculateCartQuantity} from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';

function updateCartQuantity(){
    let totalQuantity= calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML =  totalQuantity;
}

updateCartQuantity();


loadProducts(renderProductsGrid);

function renderProductsGrid(){
    let htmlString = '';
    products.forEach((item) => {
        htmlString+=`<div class="product-container js-product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${item.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${item.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${item.rating.stars*10}.png">
                <div class="${item.getStarsUrl()}">
                ${item.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${(item.priceCents/100).toFixed(2)}
            </div>

            <div class="product-quantity-container js-product-quantity-container">
                <select class="js-select-quantity-${item.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>
            ${item.extraInfoHtml()}
            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${item.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" 
            data-product-id="${item.id}" 
            >
                Add to Cart
            </button>
            </div>`; //notice data-"class name" = value in the attribute of add to cart item
    })

    document.querySelector('.js-products-grid').innerHTML = htmlString;

    let timeoutId;
    function handleAddedIcon(cartItemId){
        clearTimeout(timeoutId);
        document.querySelector(`.js-added-to-cart-${cartItemId}`).classList.add('is-toggled-on');
        timeoutId = setTimeout(()=>{
            document.querySelector(`.js-added-to-cart-${cartItemId}`).classList.remove('is-toggled-on');
        },3000);
    }



    document.querySelectorAll('.js-add-to-cart-button').forEach((addToCartButton) => {
        addToCartButton.addEventListener('click',() => {
            const cartItemId = addToCartButton.dataset.productId; //kebab-case to camelCase 
            const selectedQuantity = Number(document.querySelector(`.js-select-quantity-${cartItemId}`).value);
            addToCart(cartItemId,selectedQuantity);
            updateCartQuantity();
            handleAddedIcon(cartItemId);
        });
    });

}
