const express = require("express");
const router = express.Router();
const {
  getStaff,
  saveStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staff"); // controller functions

router.get("/", (req, res) => {
  getStaff(req, res);
});

router.post("/", (req, res) => {
  saveStaff(req, res);
});

router.patch("/", (req, res) => {
  updateStaff(req, res);
});
router.delete("/:id", (req, res) => {
  deleteStaff(req, res);
});
//
module.exports = router;
