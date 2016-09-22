var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: String,
    price: Number,
    quantity: Number,
    image: String
});

module.exports = mongoose.model('Product', ProductSchema);