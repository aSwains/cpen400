var cart = [];
var inactiveTime = 0;
var cartTotal = 0;

var products = {
    'Box1' : {
        'price': 10,
        'quantity': 5
    },
    'Box2' : {
        'price': 5,
        'quantity': 5
    },
    'Clothes1' : {
        'price': 20,
        'quantity': 5
    },
    'Clothes2' : {
        'price': 30,
        'quantity': 5
    },
    'Jeans' : {
        'price': 50,
        'quantity': 5
    },
    'Keyboard' : {
        'price': 20,
        'quantity': 5
    },
    'KeyboardCombo' : {
        'price': 40,
        'quantity': 5
    },
    'Mice' : {
        'price': 20,
        'quantity': 5
    },
    'PC1' : {
        'price': 350,
        'quantity': 5
    },
    'PC2' : {
        'price': 400,
        'quantity': 5
    },
    'PC3': {
        'price': 300,
        'quantity': 5
    },
    'Tent' : {
        'price': 100,
        'quantity': 5
    }
};

function addToCart(productName) {
    if (cart[productName] == null)
        cart[productName] = 0;
    if(products[productName].quantity == 0){
        alert("Sorry, that item is now out of stock.");
    }
    else{
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
        if (cart[productName] == 0) {
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
         lastId+=1;
         list.appendChild(entry);
     }
 }