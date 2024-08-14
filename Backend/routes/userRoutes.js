const express = require("express");
const { loginController, registerController } = require("../controllers/userController");

const router = express.Router();

//routes
//Method post for login
router.post("/login", loginController);

//Method post for register
router.post("/register", registerController);


module.exports = router;