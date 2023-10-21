const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Brand = mongoose.model(
  "brands",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    genericId: {
      type: Schema.Types.ObjectId,
      ref: "generics",
      required: true,
    },
    mfrId: {
      type: Schema.Types.ObjectId,
      ref: "manufacturers",
      required: true,
    },
  })
);
//
const Drug = mongoose.model(
  "drugs",
  new Schema({
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "brands",
      required: true,
    },
    formulationId: {
      type: Schema.Types.ObjectId,
      ref: "formulations",
      required: true,
    },
    strength: {
      type: Number,
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: "units",
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
  })
);

const Generic = mongoose.model(
  "generics",
  new Schema({
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Group = mongoose.model(
  "groups",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Formulation = mongoose.model(
  "formulations",
  new Schema({
    fullName: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Unit = mongoose.model(
  "units",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const MFR = mongoose.model(
  "manufacturers",
  new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
  })
);

const Sale = mongoose.model(
  "sales",
  new Schema({
    saleAt: {
      type: Date,
      required: true,
    },
    drugs: [
      {
        drugId: {
          type: Schema.Types.ObjectId,
          ref: "drugs",
          required: true,
        },
        quantity: { type: Number, required: true },
        mrp: { type: Number, required: true },
      },
    ],
    bill: {
      type: Number,
      required: true,
    },
  })
);

const Purchase = mongoose.model(
  "purchases",
  new Schema({
    purchaseAt: {
      type: Date,
      required: true,
    },
    drugs: [
      {
        drugId: {
          type: Schema.Types.ObjectId,
          ref: "drugs",
        },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
      },
    ],
    bill: {
      type: Number,
      required: true,
    },
  })
);

const Salary = mongoose.model(
  "salaries",
  Schema({
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "staff",
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    dueAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
  })
);

const User = mongoose.model(
  "users",
  Schema({
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "staff",
      required: true,
    },
    userName: {
      type: String,
      min: 4,
      max: 25,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      max: 1024,
      required: true,
    },
    role: {
      type: String,
      min: 25,
      max: 200,
      enum: ["admin", "manager", "pharmacist", "salesman"],
      default: "salesman",
      required: true,
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  })
);

const Staff = mongoose.model(
  "staff",
  Schema({
    fullName: {
      type: String,
      min: 4,
      max: 100,
      required: true,
    },
    email: {
      type: String,
      min: 25,
      max: 200,
      required: true,
    },
    phone: {
      type: String,
      min: 25,
      max: 200,
      required: true,
    },
    designation: {
      type: String,
      min: 25,
      max: 200,
      enum: ["admin", "manager", "pharmacist", "salesman"],
      default: "salesman",
      required: true,
    },
    isUser:{
      type: Boolean, 
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      default:null
    },
  })
);

const Attendance = mongoose.model(
  "attendances",
  Schema({
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "staff",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    shift: {
      type: String,
      enum: ["day", "evening", "night", ""],
      default: "day",
      required: true,
    },
    slots: [
      {
        start: { type: Date, required: true },
        end: { type: Date, required: true },
      },
    ],
  })
);

//
module.exports = {
  User,
  Staff,
  Group,
  Drug,
  Generic,
  Brand,
  Formulation,
  Unit,
  MFR,
  Sale,
  Salary,
  Purchase,
  Attendance,
};
