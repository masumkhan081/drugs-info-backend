const {
  saveDrug,
  getStock,
  deleteDrug,
  updateDrug,
} = require("../controllers/drugs");
const router = require("express").Router();
//

router.get("/", (req, res) => {
  getStock(req, res);
});
router.post("/", (req, res) => {
  saveDrug(req, res);
});
router.patch("/", (req, res) => {
  updateDrug(req, res);
});
router.delete("/:id", (req, res) => {
  deleteDrug(req, res);
});

module.exports = router;
