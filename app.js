const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

// Route imports 
const user = require("./routes/userRoute");
const post = require("./routes/postRoute");
const follow = require("./routes/followRoute");

app.use("/api/v1", user);
app.use("/api/v1", post);
app.use("/api/v1", follow);

// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;