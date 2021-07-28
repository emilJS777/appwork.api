const app = require('express')();
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const cors = require('cors');
require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// cors permission
app.use(cors({origin: [process.env.FRONTEND_URL]}));

app.use('/api', routes)



mongoose.connect(dbConfig.dbUri, dbConfig.options, (err) => {
    if(err) throw err;
    app.listen(process.env.PORT, () => console.log('server start', process.env.PORT))
});






