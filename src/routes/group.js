const router = require("express").Router();
//------------------------------------------------     model & controller
const {
  getGroups,
  getAllGroups,
  saveGroup,
  deleteGroup,
  updateGroup,
} = require("../controllers/group");
//
router.get("/", (req, res) => {
  console.log("got hit ");
  getAllGroups(req, res);
}); 

router.post("/", (req, res) => saveGroup(req, res));

router.patch("/", (req, res) => updateGroup(req, res));

router.delete("/:id", (req, res) => deleteGroup(req, res));

module.exports = router;
