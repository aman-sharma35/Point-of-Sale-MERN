const mongoose = require('mongoose');
 // schema: ek json object ko hum schema kehte hai
const userSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
    }
}, { timestamp: true });

const Users = mongoose.model("Users", userSchema);

module.exports = Users;

