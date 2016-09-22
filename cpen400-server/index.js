var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var mongoose = require('mongoose');
var mongooseLocalUri = 'mongodb://localhost/node2'; // connect to local db

mongoose.connect(mongooseLocalUri, function (error) {
    if (error) {
        console.log('Failed to connect to server:\n' + error);
    }
});

var Order = require('./models/order');
var Product = require('./models/product');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Request was made');
    next(); // make sure we go to the next routes and don't stop here
});

var sampleData = [
    {
        name:"KeyboardCombo",
        price:29,
        quantity:6,
        image:"https://cpen400a.herokuapp.com/images/KeyboardCombo.png"
    },
    {
        name: "Mice",
        price: 6,
        quantity: 2,
        image:"https://cpen400a.herokuapp.com/images/Mice.png"
    },
    {
        name:"PC1",
        price:300,
        quantity:10,
        image:"https://cpen400a.herokuapp.com/images/PC1.png"
    },
    {
        name:"PC2",
        price:387,
        quantity:1,
        image:"https://cpen400a.herokuapp.com/images/PC2.png"
    },
    {
        name:"PC3",
        price:380,
        quantity:4,
        image:"https://cpen400a.herokuapp.com/images/PC3.png"
    },
    {
        name:"Tent",
        price:38,
        quantity:1,
        image:"https://cpen400a.herokuapp.com/images/Tent.png"
    },
    {
        name:"Box1",
        price:7,
        quantity:0,
        image:"https://cpen400a.herokuapp.com/images/Box1.png"
    },
    {
        name:"Box2",
        price:7,
        quantity:1,
        image:"https://cpen400a.herokuapp.com/images/Box2.png"
    },
    {
        name:"Clothes1",
        price:27,
        quantity:6,
        image:"https://cpen400a.herokuapp.com/images/Clothes1.png"
    },
    {
        name:"Clothes2",
        price:20,
        quantity:6,
        image:"https://cpen400a.herokuapp.com/images/Clothes2.png"
    },
    {
        name:"Jeans",
        price:33,
        quantity:4,
        image:"https://cpen400a.herokuapp.com/images/Jeans.png"
    },
    {
        name:"Keyboard",
        price:22,
        quantity:3,
        image:"https://cpen400a.herokuapp.com/images/Keyboard.png"
    }]

function loadProducts(){
    Product.collection.insert(sampleData);
}

router.route('/orders')
        .get(function(req, res) {
            Order.find(function(err, product) {
                if (err)
                    res.send(err);
                res.json(product);
              });
        })

        .post(function(req, res) {
            var order = new Order();

            order.total = req.body.total;

            var cart = req.body.cart;

            for(var i = 0; i < req.body.cart.length; i++){
                Product.collection.update( {name:Object.keys(req.body.cart[i])[0]}, {$inc: {quantity : -req.body.cart[i][Object.keys(req.body.cart[i])[0]]}} );
            }

             order.cart = JSON.stringify(req.body.cart);
                  // save the patient and check for errors
            order.save(function(err) {
               if (err)
                  res.send(err);
               res.json({ message: "Successfully purchased" });
            });

        });

router.route('/products')

    .get(function(req, res) {
            Product.find(function(err, product) {
                if (err)
                    res.send(err);
                res.json(product);
              });
        });

loadProducts();

app.use('', router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
