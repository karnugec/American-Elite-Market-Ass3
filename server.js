const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down server due to Uncaught Exception`);
    process.exit(1);
});


// Config
dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase(); 
// require('./config/database');

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Unhandled Promise Rejection --> Mogodb Server Error
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to Unhandled Promis Rejection`);

    server.close(() => {
        process.exit(1);
    });
});