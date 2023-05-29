var userModel = require("../models/user");
var tool = require("./tool");

var studentRegister = (req, res, next) => {
  req.check("documentType", "Invalid name").notEmpty();
  req
    .check("documentNumber", "Invalid document Number")
    .isLength({ min: 8, max: 8 });
  req.check("password", "Invalid Password").isLength({ min: 1, max: 20 });

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      success: false,
      message: "Invalid inputs",
      errors: errors,
    });
  } else {
    var documentNumber = req.body.documentNumber;
    var password = req.body.password;
    var documentType = req.body.documentType;
    console.log(req.body);
    userModel
      .findOne({ documentnumber: documentNumber })
      .then((user) => {
        //user already exists
        console.log("user exist: " + user);

        if (user) {
          res.status(400).json({
            success: false,
            message: "This email is already exists!",
          });
        } else {
          //add user to database
          tool
            .hashPassword(password)
            .then((hash) => {

              var data = new userModel({
                documentnumber: documentNumber,
                password: hash,
                documenttype: documentType,
                usertype: "user",
              });

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
            })
            .catch((err) => {
              console.log("test-2")
              res.status(500).json({
                success: false,
                message: "Unable to register Profile",
              });
            });
        }
      })
      .catch((err) => {
        console.log("test-3")
        res.status(500).json({
          success: false,
          message: "Unable to register profile",
        });
      });
  }
};

module.exports = { studentRegister };
