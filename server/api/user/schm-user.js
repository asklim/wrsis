const mongoose = require( 'mongoose' );
const crypto = require( 'crypto' );
const jwt = require( 'jsonwebtoken' );


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});


userSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes( 16 ).toString( 'hex' );
    this.hash = crypto.pbkdf2Sync(
        password, 
        this.salt, 1000, 64, 'sha512'
    )
    .toString( 'hex' );
};

userSchema.methods.isValidPassword = function (password) {

    const hash = crypto.pbkdf2Sync(
        password, 
        this.salt, 1000, 64, 'sha512'
    )
    .toString( 'hex' );
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {

    const DAYS_FOR_EXPIRY = 7; // 1 Week
    
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        }, 
        process.env.JWT_SECRET,
        { expiresIn: `${DAYS_FOR_EXPIRY}d` },
    ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = userSchema;

