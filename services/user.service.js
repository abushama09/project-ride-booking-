const userModel = require('../models/user.model');


module.exports.createUser = async ({ email, password, fullname, phone }) => {
    if (!fullname ||!email || !password ||  !phone) {
        throw new Error('All fields are required');
    }
    const user =  userModel.create({
        fullname: {
        lastname
    },
    email,
    password,
    phone
    })
    return user;

}