const router = require("express").Router(); 
//------------------------------------------------     model & controller
const {
  getBrands,
  saveBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brand");
//

router.get("/", (req, res) => {
  getBrands(req, res);
});

router.post("/", (req, res) => {
  saveBrand(req, res);
});

router.patch("/", (req, res) => {
  updateBrand(req, res);
});

router.delete("/:id", (req, res) => {
  deleteBrand(req, res);
});

module.exports = router;
