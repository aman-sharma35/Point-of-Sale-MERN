const userModel = require('../models/userModel');

//Login User 
const loginController = async (req, res) => {
    try {
        const {userName,password} = req.body;
        const user = await userModel.findOne({userName,password,verified:true});
        if(user){
            res.status(200).send(user);
        }else{
            res.json({
                message: "Login Fail",
                user,
            })
        }
    } catch (error) {
        console.log(error)
    }
};

//Register User
const registerController = async (req, res) => {
    try {
        const newUser = new userModel({...req.body,verified: true});
        await newUser.save();
        res.status(201).send("Registration Successful!");
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
};

module.exports = { loginController, registerController}; 