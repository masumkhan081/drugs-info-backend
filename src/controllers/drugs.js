const { Drug } = require("../models");
const obj = require("../data-tier/settings");

async function getStock(req, res, searchObj) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await Drug.count();
  let msg = searchObj?.name ? `Searched for '${searchObj?.name}'` : "plain--";

  Drug.find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((stock) => {
      res.status(200).send({
        stock,
        msg,
        count,
        skip,
        limit: obj.limit,
      });
    })
    .catch((err) => {
      res.send(obj.msg_err_load + "  err: " + err);
    });
}

async function saveDrug(req, res) {
  const { brandId, formulationId, strength, unitId, available, mrp } = req.body;

  (await Drug.findOne({ brandId, formulationId, strength, unitId }))
    ? res.status(400).send({ message: "Already exist" })
    : (await new Drug({
        brandId,
        formulationId,
        strength,
        unitId,
        available,
        mrp,
      }).save())
    ? res.status(200).send({ message: "Saved successfully" })
    : res.status(400).send({ message: "Error saving new unit" });
}

async function updateDrug(req, res) {
  const { id, brandId, formulationId, strength, unitId, available, mrp } =
    req.body;
  (await Drug.findByIdAndUpdate(id, {
    brandId,
    formulationId,
    strength,
    unitId,
    available,
    mrp,
  }))
    ? res.status(200).send({ message: "Updated successfully" })
    : res.status(400).send({ message: "Error in update" });
}

async function deleteDrug(req, res) {
  const { id } = req.params;
  (await Drug.findByIdAndDelete(id))
    ? res.status(200).send({ message: "Deleted successfully" })
    : res.status(400).send({ message: "Error in deletion" });
}

module.exports = { saveDrug, getStock, updateDrug, deleteDrug };
