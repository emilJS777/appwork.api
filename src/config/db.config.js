require('dotenv').config()

module.exports = {
    dbUri: process.env.MONGODB_URL,
    options: {
        useNewUrlParser: true,  
        useUnifiedTopology: true, 
        useCreateIndex: true,
    }
}