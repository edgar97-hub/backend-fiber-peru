var mongoose = require("mongoose");
var branchRoleSchema = require("../schemas/branchRole");

var branchRoleModel = mongoose.model("branchRole", branchRoleSchema);

module.exports = branchRoleModel;
