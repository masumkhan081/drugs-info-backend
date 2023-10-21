const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const initDB = require("./src/data-tier/mongodb");

// initialize the database
initDB();

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
//

// routes
app.use("/auth", require("./src/routes/auth"));
app.use("/formulations", require("./src/routes/formulation"));
app.use("/units", require("./src/routes/unit.js"));
app.use("/groups", require("./src/routes/group"));
app.use("/generics", require("./src/routes/generic"));
app.use("/brands", require("./src/routes/brand"));
app.use("/manufacturers", require("./src/routes/manufacturer"));
app.use("/drugs", require("./src/routes/drug"));
app.use("/sale", require("./src/routes/sale"));
app.use("/purchases", require("./src/routes/purchase"));
app.use("/staff", require("./src/routes/staff"));
app.use("/salaries", require("./src/routes/salary"));

app.listen(3000, () => {
  console.log("running ...");
});
