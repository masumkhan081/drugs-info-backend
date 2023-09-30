const express = require("express");
const app = express();
require("dotenv").config();
const initDB = require("./src/datatier/mongodb");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')

// initialize the database
initDB();

// server creation
// const server = app.listen(process.env.PORT, () =>
//   console.log("listening at: ", process.env.PORT)
// );
// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:5173'})); 
// 
// const whitelist = ['http://localhost:5173', 'http://example2.com'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)
//       callback(new Error('Not allowed by CORS'));
//   }
// }
// app.use(cors(corsOptions));


// routes
app.use("/auth", require("./src/routes/authRoutes"));

app.listen(3000, () => {
  console.log("running ...");
});

// // close the server
app.get("/quit", function (req, res) {
  res.send("closed");
});
// server closing endpoint; no need what so ever
app.get("/", (req, res) => {
  res.send(`<a href="/quit">quit</a>`);
});
