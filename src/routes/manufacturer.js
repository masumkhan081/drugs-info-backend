const express = require("express");
const router = express.Router();
const {
  getAllMFR,
  getMFR,
  saveMFR,
  deleteMFR,
  updateMFR,
} = require("../controllers/manufacturer"); // controller functions

router.get("/", (req, res) => {
  getMFR(req, res);
});

router.get("/all", (req, res) => {
  getAllMFR(req, res);
});

router.post("/", (req, res) => {
  saveMFR(req, res);
});

router.patch("/", (req, res) => {
  updateMFR(req, res);
});

router.delete("/:id", (req, res) => {
  deleteMFR(req, res);
});

//
module.exports = router;
