require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userManage = require("./routes/userManage");
const doctorRoutes = require("./routes/doctorRoutes");
const doctorDetailsManage = require("./routes/doctorDetailsManage");
const connection = require("./DB_Connection");
const userRoutes = require("./routes/signUpTask");
const login = require("./routes/loginTask");
const messageRoutes = require("./routes/messageRoutes");

app.use(express.json());
app.use(cors());

// database connection
connection();

app.use("/api/users", userRoutes);
app.use("/api/auth",login);
app.use(userManage);
app.use(doctorRoutes);
app.use("/doctor",doctorDetailsManage);
app.use(messageRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
