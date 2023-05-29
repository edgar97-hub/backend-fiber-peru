var express = require("express");
var router = express.Router();

var loginService = require("../services/login");
var userBranchService = require("../services/userBranch");

router.get("/detailstest", userBranchService.getUserDetails);
router.get("/details", loginService.userDetails);

module.exports = router;
