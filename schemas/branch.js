var mongoose = require("mongoose");

var branchSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companyModel",
    },
  },
  {
    timestamps: {},
  }
);

module.exports = branchSchema;
