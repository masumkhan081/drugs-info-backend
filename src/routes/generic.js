const router = require("express").Router();
const {
  getGenerics,
  saveGeneric,
  deleteGeneric,
  updateGeneric,
} = require("../controllers/generic");
//

router.get("/", (req, res) => {
  getGenerics(req, res);
});

router.post("/", (req, res) => saveGeneric(req, res));

router.patch("/", (req, res) => updateGeneric(req, res));

router.delete("/:id", (req, res) => deleteGeneric(req, res));

module.exports = router;
