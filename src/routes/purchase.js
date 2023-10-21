const router = require("express").Router();
const {
  getPurchases,
  savePurchase,
  deletePurchase,
  updatePurchase,
} = require("../controllers/purchase");
//
router.get("/", (req, res) => {
  getPurchases(req, res);
});
router.post("/", (req, res) => {
  savePurchase(req, res);
});
router.patch("/", (req, res) => {
  updatePurchase(req, res);
});
router.delete("/:id", (req, res) => {
  deletePurchase(req, res);
});

router.get("/search", (req, res) => {
  const name = req.query.frmname;
  getPurchases(req, res, { name: name });
});
module.exports = router;
