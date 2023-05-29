var mongoose = require("mongoose");
var branchSchema = require("../schemas/branch");

var branchModel = mongoose.model("branch", branchSchema);

module.exports = branchModel;
