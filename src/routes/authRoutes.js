const router = require("express").Router();
const { sendOtpMail, sendResetMail } = require("../controller/emailSender");
const {
  checkAndAddUser,
  checkAndLoginUser,
  logOut,
  checkForpassReset,
  updateNewPassword,
} = require("../controller/user");
const { cookieValidation } = require("./middlewares");
const userModel = require("../model/user");

// router.use(cookieValidation);
router.get("/", cookieValidation, (req, res) => {
  res.send(`you are good !`);
});
router.get("/profile", (req, res) => {
  res.send(`profile`);
});

router.post("/register", (req, res) => {
  // destructuring the expected
  const { fullName, email, password, phone } = req.body;
  // validation and insertion
  checkAndAddUser({ fullName, email, password, phone, res });
});

router.post("/login", (req, res) => {
  // destructuring the expected
  const { email, password } = req.body;
  console.log("ewfwefwef:  ", email, password);
  // validation and login
  checkAndLoginUser({ email, password, res });
});

router.get("/logout", (req, res) => {
  logOut(req, res);
});

router.post("/recovery", async (req, res) => {
  // destructuring the expected
  const { email } = req.body;
  const existence = await userModel.findOne({ email }).exec();
  if (existence) {
    sendResetMail({ user: existence, res });
  } else {
    res.status(400).send({ message: "No Registered User With This Mail" });
  }
});

router.get("/recovery/:token", (req, res) => {
  // destructuring the expected
  const { token } = req.params;
  checkForpassReset({ token, res });
});

router.post("/reset", (req, res) => {
  // destructuring the expected
  const { password } = req.body;
  // validation
  res.send(password);
  updateNewPassword({ password, res });
});

router.post("/verification", async (req, res) => {
  const { email } = req.body;
  const existence = await userModel.findOne({ email }).exec();
  if (existence) {
    sendOtpMail({ user: existence, res });
  } else {
    res.status(400).send({ message: "No Registered User With This Mail" });
  }
});

router.post("/verify", (req, res) => {
  const { otp, token } = req.body;
  markProfileValidation({ otp, token, res });
});

module.exports = router;
