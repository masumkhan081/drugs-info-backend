const mongoose = require("mongoose");
const { formulationModel, drugDetailModel } = require("../models/models");
const { render_now, limit } = require("./renderMaster");
const obj = require("./renderMaster");
//

async function renderFormulations(req, res, searchObj = { name: "" }) {
  const { pagenumb } = req.query;

  let skip = 0;
  if (pagenumb) {
    skip = obj.limit * pagenumb - obj.limit;
  }

  let count = await formulationModel.count();

  let msg = searchObj.name ? `Searched for '${searchObj.name}'` : "plain--";

  formulationModel
    .find()
    .sort({ $natural: -1 })
    .limit(obj.limit)
    .skip(skip)
    .then((formulations) => {
      res.send({
        formulations,
        msg,
        count,
        skip,
        limit: obj.limit,
      });
    })
    .catch((err) => {
      res.send(err);
    });
}

function createAndSave(req, res) {
  const { frmname, pagenumb } = req.body;
  let redirectUrl =
    pagenumb === "1" ? "/groups" : "/groups?pagenumb=" + pagenumb;
  console.log(redirectUrl + "   see me : " + pagenumb);
  checkExistence(frmname)
    .then((exist) => {
      if (exist == true) {
        req.flash("msg", obj.msg_exist);
        res.redirect(redirectUrl);
      } else {
        const newFormulation = new formulationModel({
          name: frmname,
        });
        newFormulation
          .save()
          .then((data) => {
            req.flash("msg", obj.msg_save);
            renderFormulations(req, res);
          })
          .catch((err) => {
            req.flash("msg", obj.msg_err_save);
            res.redirect(redirectUrl);
          });
      }
    })
    .catch((err) => {
      console.log("err: " + err);
    });
}

function handleUpdate(req, res) {
  const { frmid, frmname, pagenumb } = req.body;
  console.log(pagenumb + "  see me how i look: " + typeof pagenumb);
  let redirectUrl =
    pagenumb === "1" ? "/formulations" : "/formulations?pagenumb=" + pagenumb;
  checkExistence(frmname)
    .then((exist) => {
      if (exist == true) {
        req.flash("msg", obj.msg_exist);
        res.redirect(redirectUrl);
      } else {
        formulationModel.findByIdAndUpdate(
          frmid,
          { name: frmname },
          function (err, docs) {
            if (docs) {
              req.flash("msg", obj.msg_update);
              res.redirect(redirectUrl);
            } else {
              req.flash("msg", obj.msg_err_update);
              res.redirect(redirectUrl);
            }
          }
        );
      }
    })
    .catch((err) => console.log(err));
}

function handleDelete(req, res) {
  const { frmid, pagenumb } = req.query;
  console.log(" pok pok pok pok: " + frmid);
  let redirectUrl =
    pagenumb === "1" ? "/formulations" : "/formulations?pagenumb=" + pagenumb;
  drugDetailModel.findOne({ frm_id: frmid }, function (err, docs) {
    if (docs) {
      req.flash("msg", obj.msg_associated);
      res.redirect(redirectUrl);
    } else {
      formulationModel.findByIdAndDelete(frmid, function (err, docs) {
        if (docs) {
          req.flash("msg", obj.msg_delete);
        } else {
          req.flash("msg", obj.msg_err_delete);
        }
        res.redirect(redirectUrl);
      });
    }
  });
}
async function checkExistence(name) {
  return await formulationModel
    .findOne({ name: name })
    .then((res) => {
      if (res) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      return err;
    });
}
async function getFormulations(skip, limit) {
  return await formulationModel
    .find()
    .limit(limit)
    .skip(skip)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log("error ki maki");
    });
}
const frmFunctions = {
  handleDelete,
  handleUpdate,
  checkExistence,
  createAndSave,
  getFormulations,
  renderFormulations,
};
module.exports = frmFunctions;
