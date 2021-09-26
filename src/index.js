//executed model schema
require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //deprecated
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://nadans:nadans@cluster0.6whqr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  // res.send("hi there !");
  res.send(`Your Email : ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
