var mongoose = require("mongoose");

var branchRoleSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roleModel",
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "branchModel",
    },
  },
  {
    timestamps: {},
  }
);

module.exports = branchRoleSchema;
