class Cart{
    cartItems;
    #localStorageKey;

    constructor(localKey){
        this.#localStorageKey = localKey;
        this.loadFromStorage();
    }


    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems=[{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                cartItemQuantity: 2,
                deliveryOptionId: '1'
            },{
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                cartItemQuantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    updateLocalStorage(){
        localStorage.removeItem(this.#localStorageKey);
        localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }

    addToCart(itemId,selectedQuantity){
    
        let matchingItem;
        this.cartItems.forEach((item) => {
            if(itemId===item.productId){
                matchingItem = item;
            }
        });

        if(matchingItem){
            matchingItem.cartItemQuantity+=selectedQuantity;
        }else{
            this.cartItems.push({
                productId: itemId,
                cartItemQuantity: selectedQuantity,
                deliveryOptionId: '1'
            });
        }

        this.updateLocalStorage();
    }

    removeFromCart(itemId){
        let newCart=[];

        this.cartitems.forEach((item)=>{
            if(item.productId !== itemId){
                newCart.push(item);
            }
        });

        this.cartItems = newCart;
        this.updateLocalStorage();
    }

    calculateCartQuantity(){
        let totalQuantity=0;
        this.cartItems.forEach((item) => {
            totalQuantity+=item.cartItemQuantity;
        });

        return totalQuantity;
    }

    updateQuantity(productId,newQuantity){

        this.cartItems.forEach((item) => {
            if(item.productId===productId) item.cartItemQuantity = newQuantity;
        });
        this.updateLocalStorage();
    }

    updateDeliveryOption(productId, deliveryId){
        let matchingItem;
        this.cartItems.forEach((item)=>{
            if(item.productId===productId){
                matchingItem = item;
            }
        });
        matchingItem.deliveryOptionId = deliveryId;
        this.updateLocalStorage();
    }

}

const usualCart = new Cart('usual-cart');
usualCart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",1);
console.log(usualCart);
