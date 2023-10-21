const router = require("express").Router();
const {
  getFormulations,
  saveFormulation,
  updateFormulation,
  deleteFormulation,
} = require("../controllers/formulation");
//
router.get("/", (req, res) => {
  getFormulations(req, res);
});
router.post("/", (req, res) => {
  saveFormulation(req, res);
});
router.patch("/", (req, res) => {
  updateFormulation(req, res);
});
router.delete("/:id", (req, res) => {
  deleteFormulation(req, res);
});

module.exports = router;
