var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    cart: String,
    total: Number
});

module.exports = mongoose.model('Order', OrderSchema);