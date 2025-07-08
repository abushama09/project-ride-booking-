const userModel = require('../models/user.model');
const userService = require('../services/user.service');

const { validationResult } = require('express-validator');







module.exports.registerUser = async (req, res , next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    const { firstname , lastname, email, password, phone } = req.body;


    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        fullname: {
            firstname,
            lastname
        },
        email,
        password: hashedPassword,
        phone
    });

 const token = user.generateAuthToken();

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone
        },
        token
    });


}