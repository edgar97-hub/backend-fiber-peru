var mongoose = require("mongoose");
var companySchema = require("../schemas/company");

var companyModel = mongoose.model("company", companySchema);

module.exports = companyModel;
