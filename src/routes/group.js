const router = require("express").Router();
//------------------------------------------------     model & controller
const {
  getGroups,
  saveGroup,
  deleteGroup,
  updateGroup,
} = require("../controllers/group");
//
router.get("/", (req, res) => {
  getGroups(req, res);
});

router.post("/", (req, res) => saveGroup(req, res));

router.patch("/", (req, res) => updateGroup(req, res));

router.delete("/:id", (req, res) => deleteGroup(req, res));

module.exports = router;
