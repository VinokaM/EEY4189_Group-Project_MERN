require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./DB_Connection");
const userRoutes = require("./routes/signUpTask")

app.use(express.json());
app.use(cors());

// database connection
connection();

app.use("/api/users", userRoutes);


const port = process.env.PORT || 6000;
app.listen(port, console.log(`Listening on port ${port}...`));
