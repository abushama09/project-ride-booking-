const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters long'],

        },

            lastname:{
                type: String,
                
                minlength:[3, 'Last name must be at least 3 characters long']
            }
            },
            email:{
                type: String,
                required: true,
                unique: true,
                match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
            
            },
            password:{
                type: String,
                required: true,
                select: false, 
                minlength:[6, 'Password must be at least 6 characters long']
            },
            phone:{
                type: String,
                required: true,
                match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
            },  

            socketId:{
                type: String

            },
            
        
    
})
userSchema.methods.generateAuthToken = function() {
    const token = jsonwebtoken.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
} 
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model('User', userSchema);
module