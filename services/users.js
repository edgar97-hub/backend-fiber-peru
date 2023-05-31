const jwt = require("jsonwebtoken");
var config = require("config");
var userModel = require("../models/user");
var inquiryModel = require("../models/inquiry");

var passport = require("./passportconf");
const bcrypt = require("bcrypt");

var getUsers = (req, res, next) => {
	var documentNumber = req.body.documentNumber;
	var password = req.body.password;
	//res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	//const data = await userModel.find().toArray();
	userModel.find({}, function (err, users) {
		var userMap = {};

		users.forEach(function (user) {
			userMap[user._id] = user;
		});
		res.send({
			success: true,
			message: "test",
			userMap: users
		});
		//res.send(userMap);
	});


};


var getQueries = (req, res, next) => {
	var documentNumber = req.body.documentNumber;
	var password = req.body.password;
	//const data = await userModel.find().toArray();
	inquiryModel.find({}, function (err, inquiries) {


		res.send({
			success: true,
			message: "test",
			userMap: inquiries
		});
	});


};



var saveInquiry = (req, res, next) => {

	var distrito = req.body.distrito;
	var fullname = req.body.fullname;
	var documenttype = req.body.documenttype;
	var documentnumber = req.body.documentnumber;

	var email = req.body.email;
	var mobile = req.body.mobile;
	var message = req.body.message;


	var data = new inquiryModel({
		distrito: distrito,
		fullname: fullname,
		documenttype: documenttype,
		documentnumber: documentnumber,
		email: email,
		mobile: mobile,
		message: message,

	});

	console.log({
		distrito: distrito,
		fullname: fullname,
		documenttype: documenttype,
		documentnumber: email,
		email: email,
		mobile: mobile,
		message: message,

	})

	data
		.save()
		.then(() => {
			res.json({
				success: true,
				message: "Profile created successfully!",
			});
		})
		.catch((err) => {
			console.log("test-1", err)
			res.status(500).json({
				success: false,
				message: "Unable to register Profile",
			});
		});

};

module.exports = { getUsers, getQueries, saveInquiry };
