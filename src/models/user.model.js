const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    Email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },

    EmailActive: {
        type: Boolean,
        default: false
    },

    PasswordHash: {
        type: String,
        require: true
    },

    FirstName: {
        type: String,
        require: true
    },

    LastName: {
        type: String,
        require: true
    },

    Wallet: {
        type: Number,
        require: true,
        default: 0
    },

    CreateAccountDate: {
        type: Date,
        require: true,
        default: () => Date.now()
    },
})

const User = module.exports = model('User', UserSchema);
const bcrypt = require('bcryptjs')

// Registration new user
User.create = async (Email, PasswordHash, FirstName, LastName) => {
    return await new User({Email,PasswordHash,FirstName,LastName,}).save();
}
// getOne user
User.getOne = async (field) => {
    const user = await User.findOne(field)
    return user;
}
// confirm email is taken
User.emailIsTaken = async (email) => {
    const user = await User.findOne({Email: email})
    return !!user;
}
// hash password
User.passwordHash = (password) => {
    const hash = bcrypt.hashSync(password, 6);
    return hash;
}
// compare password
User.passwordCompare = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}

// *****************
// caches
User.cache = [];

// add user in cache
User.cacheAdd = (user) => {
    for(let item of User.cache){
        if(item._id === user._id)
        return item;
    }
    User.cache.push(user)
    return user;
}

// // find user in ceche
User.cacheGetById = (id) => {
    for(let item of User.cache){
        if(id.toString() === item._id.toString())
            return item;
    }
    return null;
}

