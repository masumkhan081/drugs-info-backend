const router = require("express").Router();
const { sendOtpMail, sendResetMail } = require("../util/mail");
const {
  checkUserAddition,
saveUser,
loginUser,
logOut,
checkPassReset,
updatePassword,
} = require("../controllers/auth");
const { cookieValidation } = require("../middleware/middlewares");
const { User } = require("../models");


router.get("/register/:token", (req, res) => {
  // destructuring the expected
  const { token } = req.params;
  // validation and insertion
  checkUserAddition({token, res });
});

router.post("/register", (req, res) => {
  // destructuring the expected
  const { fullName, email, password, phone } = req.body;
  // validation and insertion
  saveUser({ fullName, email, password, phone, res });
});

router.post("/login", (req, res) => {
  // destructuring the expected
  const { email, password } = req.body;
  console.log("ewfwefwef:  ", email, password);
  // validation and login
  loginUser({ email, password, res });
});

router.get("/logout", (req, res) => {
  logOut(req, res);
});

router.post("/recovery", async (req, res) => {
  // destructuring the expected
  const { email } = req.body;
  const existence = await User.findOne({ email }).exec();
  if (existence) {
    sendResetMail({ user: existence, res });
  } else {
    res.status(400).send({ message: "No Registered User With This Mail" });
  }
});

router.get("/recovery/:token", (req, res) => {
  // destructuring the expected
  const { token } = req.params;
  checkPassReset({ token, res });
});

router.post("/reset", (req, res) => {
  // destructuring the expected
  const { password } = req.body;
  // validation
  res.send(password);
  updatePassword({ password, res });
});


module.exports = router;
