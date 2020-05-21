require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
var bodyParser = require('body-parser')
const server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

var dbUrl = "";

// if (process.env.NODE_ENV === "production") {
  dbUrl = `mongodb+srv://jjmateer:${process.env.MONGO_PW}@cluster0-q0kab.mongodb.net/classorganizerdbdemo?retryWrites=true&w=majority`;
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
// }
// else {
//   dbUrl = "mongodb://localhost/classorganizerdb";
//   app.use(express.static(path.join(__dirname, "/client/public")));
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/public/index.html"));
//   });
// }


mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log(`Connected to ${dbUrl}`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

io.on('connection', function (socket) {
  console.log(`User Connected: ${socket.id}`);
  socket.on('disconnect', function () {
    console.log(`User Disconnected ${socket.id}`);
  });
});