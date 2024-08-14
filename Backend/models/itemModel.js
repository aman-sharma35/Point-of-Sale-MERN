const mongoose = require('mongoose');
 // schema: ek json object ko hum schema kehte hai
const itemSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamp: true });

const Items = mongoose.model("Items", itemSchema);

module.exports = Items;

