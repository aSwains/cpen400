var cart = [];
var products = [];
var inactiveTime = 0;

products["Box1"] = 5;
products["Box2"] = 5;
products["Clothes1"] = 5;
products["Clothes2"] = 5;
products["Jeans"] = 5;
products["Keyboard"] = 5;
products["KeyboardCombo"] = 5;
products["Mice"] = 5;
products["PC1"] = 5;
products["PC2"] = 5;
products["PC3"] = 5;
products["Tent"] = 5;

function addToCart(productName) {
    if (cart[productName] == null)
        cart[productName] = 0;
    if(products[productName] == 0){
        alert("Sorry, that item is now out of stock.");
    }
    else{
        cart[productName]++;
        products[productName]--;
    }

    inactiveTime = 0;
}

function removeFromCart(productName) {
    if (cart[productName] == null) {
        alert("There is no " + productName + " in the cart.");
    }
    else {
        cart[productName]--;
        if (cart[productName] == 0) {
            delete cart[productName];
        }
        products[productName]++;
    }
    inactiveTime = 0;
}

function showCart(){

    var element;
    var cartItems = "";
    var i = 0;

    for(element in cart){
        cartItems = element + ": " + cart[element] + "\n";
        doSetTimeout(i, cartItems);
        i++;
    }

    if(element == null){
        alert("Your cart is empty");
    }

    inactiveTime = 0;
}

function doSetTimeout(i, cartItems) {
  setTimeout(function() { alert(cartItems); }, 30000*i);
}

window.setTimeout("Tick()", 1000);
function Tick() {
    window.setTimeout("Tick()", 1000);
    inactiveTime = inactiveTime + 1;
    if(inactiveTime >= 30){
        alert("Hey there! Are you still planning to buy something?");
        inactiveTime = 0;
    }
}