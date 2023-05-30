//Cart
let cartIcon= document.querySelector('#cart-icon');
let cart= document.querySelector('.cart');
let closeCart=document.querySelector('#close-cart');
//open cart
cartIcon.onclick=()=>{
    cart.classList.add("active");
}
//close cart
closeCart.onclick=()=>{
    cart.classList.remove("active");
};

if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",readyy);
}else{
    readyy();
}

function readyy(){
    var reomveCartButtons =document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for(var i=0;i<reomveCartButtons.length;i++)
    {
        var button=reomveCartButtons[i];
        button.addEventListener("click",removeCartItem);
    }
    //quantity changes
    var quantityInputs=document.getElementsByClassName("cart-quantity");
    for(var i=0;i<quantityInputs.length;i++)
    {
        var input=quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    //Add to cart
    var addCart=document.getElementsByClassName("add-cart");
    for(var i=0;i<addCart.length;i++)
    {
        var button=addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    //button buy work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);
}
//buy button sa7
function buyButtonClicked(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);

    }
    updatetotal();
}


//Remove item from cart sa7
function removeCartItem(event){
var buttonClicked=event.target;
buttonClicked.parentElement.remove();
updatetotal();
}
//Changes of quantity sa7
function quantityChanged(event){
var input=event.target;
if(isNaN(input.value) || input.value<=0){
    input.value=1;
}
updatetotal();
}
//Add to cart sa7
function addCartClicked(event){
var button=event.target;
var shopProducts=button.parentElement;
var title =shopProducts.getElementsByClassName("product-title")[0].innerText;
var price =shopProducts.getElementsByClassName("price")[0].innerText;
var productImg =shopProducts.getElementsByClassName("product-img")[0].src;
addProductToCart(title,price,productImg);
updatetotal();
}
//products appear in cart sa7
function addProductToCart(title,price,productImg){
    var cartShopBox=document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems=document.getElementsByClassName("cart-content")[0];
    var cartItemsNames=cartItems.getElementsByClassName("cart-product-title");
    for(var i=0;i<cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText==title){
            return;
        }
      
    }
    var cartBoxContent=`	
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                            <div class="Size">
                                <select name="size">
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="x-large">X-Large</option>
                                </select>
                            </div>
                            <div class="Color">
                                <select name="color">
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Red">Red</option>                              
                                    <option value="Green">Green</option>                              
                                    <option value="Yellow">Yellow</option>

                                </select>
                            </div>
                        </div>
                         <!--Remove Cart--> 
                        <i class='bx bxs-trash-alt cart-remove' ></i>
                        `;

cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);
}



//update sa7
function updatetotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=cartContent.getElementsByClassName("cart-box");
    var total=0;
    for(var i=0;i<cartBoxes.length;i++){
        var cartBox=cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0];
        var price=parseFloat(priceElement.innerText.replace("$",""));
        var quantity=quantityElement.value;
        total =total+ (price * quantity);
    }//
        total=Math.round(total*100)/100;
        document.getElementsByClassName("total-price")[0].innerText="$"+total;
    

}


function addToWishlist(productId) {
    // Send an AJAX request to the server to add the product to the wishlist
    fetch(`/wishlist/${productId}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Product added to the wishlist, you can show a success message or update the UI as needed
        console.log('Product added to wishlist:', data);
      })
      .catch(error => {
        // Error occurred while adding the product to the wishlist
        console.error('Error adding product to wishlist:', error);
      });
  }
  