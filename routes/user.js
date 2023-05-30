var express = require("express");
var router = express.Router();

var loginService = require("../services/login");
var userBranchService = require("../services/userBranch");
var userService = require("../services/users");

router.get("/detailstest", userBranchService.getUserDetails);
router.get("/details", loginService.userDetails);
router.get("/", userService.getUsers);
router.get("/consultas", userService.getQueries);
router.post("/consultas", userService.saveInquiry);

module.exports = router;
