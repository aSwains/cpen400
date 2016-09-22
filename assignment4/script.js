var products = [];
var oldProducts = [];
var cart = [];
var inactiveTime = 0;
var cartTotal = 0;
var onCheckout = false;

function addToCart(productName) {
    if(products[productName].quantity == 0){
        alert("Sorry, that item is now out of stock.");
    }
    else{
        if (cart[productName] == null)
            cart[productName] = 0;
        cart[productName]++;
        products[productName].quantity--;
        cartTotal += products[productName].price;
        document.getElementById("cartButton").textContent = "Cart ($" + cartTotal + ")";
        console.log(document.getElementById(productName + "Btn").style.display);
        document.getElementById(productName + "Btn").style.visibility = "visible";
    }
    inactiveTime = 0;
    populateCart();
}

function removeFromCart(productName) {
    if (cart[productName] == null) {
        alert("There is no " + productName + " in the cart.");
    }
    else {
        cart[productName]--;
        if (cart[productName] <= 0) {
            delete cart[productName];
            document.getElementById(productName + "Btn").style.visibility = "hidden";
        }
        products[productName].quantity++;
        cartTotal -= products[productName].price;
        document.getElementById("cartButton").textContent = "Cart ($" + cartTotal + ")";
    }
    inactiveTime = 0;
    populateCart();
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
    document.getElementById("inactiveTime").textContent = "Time inactive: " + inactiveTime + "s";
    if(inactiveTime >= 300){
        alert("Hey there! Are you still planning to buy something?");
        inactiveTime = 0;
    }
}

function populateCart() {
    var list = document.getElementById('showCartItems');
    list.innerHTML = '';
     var lastId = 0;
     var showCartItems = "";

     document.getElementById("showCartPrices").innerHTML = '';
     document.getElementById("showCartPrices").appendChild(document.createTextNode("Cart total: $" + cartTotal));

     for(element in cart){
         showCartItems = element + ": " + cart[element];
         var entry = document.createElement('li');
         entry.appendChild(document.createTextNode(showCartItems));
         entry.setAttribute('id','item'+lastId);
         var addButton = document.createElement('button');
          addButton.appendChild(document.createTextNode("add"));
          addButton.setAttribute('onClick','addToCart("'+element+'")');
          entry.appendChild(addButton);
         var removeButton = document.createElement('button');
         removeButton.appendChild(document.createTextNode("remove"));
         removeButton.setAttribute('onClick','removeFromCart("'+element+'")');
         entry.appendChild(removeButton);
         entry.appendChild(document.createTextNode("$" + products[element].price));
         lastId+=1;
         list.appendChild(entry);
         if (cart[element] <= 0) {
             delete cart[element];
             document.getElementById(element + "Btn").style.visibility = "hidden";
         }
     }
 }

function cartCheckout() {

    populateCart();
    onCheckout = true;
    oldProducts = JSON.parse(JSON.stringify(products));

    reloadProducts();


}

function productsReloadCheckout(){
    var priceChanged = false;
    for(productName in cart){
        cartTotal -= oldProducts[productName].price * cart[productName];
        if(oldProducts[productName].price != products[productName].price){
            alert("The price of " + productName + " has changed from " + oldProducts[productName].price + " to " + products[productName].price)
            priceChanged = true;
        }
        if(products[productName].quantity < cart[productName]){
            cart[productName] = products[productName].quantity;
            alert("Sorry, the max quantity for " + productName + " is changed to " + products[productName].quantity)
            priceChanged=true;
        }
        cartTotal += products[productName].price * cart[productName];
        populateCart();
    }
    populateCart();
    if(priceChanged)
        alert("The new price is: $" + cartTotal);
    onCheckout = false;
    $('#myModal').modal('hide');

    document.getElementById("cartButton").textContent = "Cart ($" + cartTotal + ")";
}

function updatePrices(){
    for(productName in products){
        document.getElementById(productName).textContent = "$" + products[productName].price;
    }
}


window.onload = reloadProducts();

function reloadProducts() {
    var tries = 0;
    var sendMessage = function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://cpen400a.herokuapp.com/products");
        xhr.onload = function () {
            if (xhr.status == 200) {
                console.log("status == 200");
                products = JSON.parse(xhr.responseText);
                console.log(products);
                updatePrices();
                if(onCheckout){
                    productsReloadCheckout();
                }
            } else {
                tries++;
                if (tries <= 10)
                    sendMessage();
            }
        };
        xhr.ontimeout = function () {
            tries++;
            if (tries <= 10)
                sendMessage();
        }
        xhr.onerror = function () {
            tries++;
            if (tries <= 10)
                sendMessage();
        };
        xhr.onabort = function () {
            tries++;
            if (tries <= 10)
                sendMessage();
        };
        // All the handlers are setup, so send the message
        xhr.timeout = 5000;     // Wait at most 5000 ms for a response
        console.log("Sending request " + xhr);
        xhr.send();
    }
    sendMessage();

};
