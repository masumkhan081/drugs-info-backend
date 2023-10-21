const { Generic } = require("../models");
const obj = require("../data-tier/settings");
//

async function getGenerics(req, res) {
  const { pagenumb } = req.query;
  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }
  let count = await Generic.count();
  let msg = "";
  Generic.find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((data) => {
      res.send({
        groups: data,
        msg,
        count,
        skip,
        authstatus: false,
        limit: obj.limit,
      });
    })
    .catch((err) => {
      res.send(err);
    });
}

async function saveGeneric(req, res) {
  const { groupId, name } = req.body;
  (await Generic.findOne({ name }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new Generic({
        groupId,
        name,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function updateGeneric(req, res) {
  const { id, groupId, name } = req.body;
  (await Generic.findByIdAndUpdate(id, { groupId, name }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function deleteGeneric(req, res) {
  const { id } = req.params; 
  (await Generic.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

module.exports = {
  getGenerics,
  saveGeneric,
  deleteGeneric,
  updateGeneric,
};
