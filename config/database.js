const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:"./config/config.env"});  

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Database Connected`);
    }).catch((err) => console.log(`Database Not Connected`));
}

module.exports = connectDatabase;