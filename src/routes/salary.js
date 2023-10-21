const express = require("express");
const router = express.Router();
const {
  getSalaries,
  saveSalary,
  updateSalary,
  deleteSalary,
} = require("../controllers/salary"); // controller functions

router.get("/", (req, res) => {
  getSalaries(req, res);
});

router.post("/", (req, res) => {
  saveSalary(req, res);
});

router.patch("/", (req, res) => {
  updateSalary(req, res);
});
router.delete("/:id", (req, res) => {
  deleteSalary(req, res);
});
//
module.exports = router;
