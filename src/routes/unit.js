const express = require("express");
const router = express.Router();
const {
  getUnits,
  saveUnit,
  deleteUnit,
  updateUnit,
} = require("../controllers/unit"); // controller functions

router.get("/", (req, res) => {
  getUnits(req, res);
});

router.post("/", (req, res) => {
  saveUnit(req, res);
});

router.patch("/", (req, res) => {
  updateUnit(req, res);
});

router.delete("/:id", (req, res) => {
  deleteUnit(req, res);
});

//
module.exports = router;
