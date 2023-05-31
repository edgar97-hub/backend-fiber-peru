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
	res.set({ "Access-Control-Allow-Origin": "*" });

	if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
	// console.log("token: "+token)
	try {
    // Verify the token is valid
		var JWT_SECRET =
		"goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

    const { user } = jwt.verify(token, JWT_SECRET);

		userModel.find({}, function (err, users) {
			res.send({
				success: true,
				message: "test",
				userMap: users,
				message2: `Congrats ${user}! You can now accesss the super secret resource`,

			});
		});
   
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
	


};


var getQueries = (req, res, next) => {

	if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
	// console.log("token: "+token)
	try {

		var JWT_SECRET =
		"goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

    const { user } = jwt.verify(token, JWT_SECRET);

		inquiryModel.find({}, function (err, inquiries) {
			res.send({
				success: true,
				message: "test",
				userMap: inquiries
			});
			 
		});
    
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }


 


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
