const jwt = require("jsonwebtoken");
var config = require("config");
var userModel = require("../models/user");
var passport = require("./passportconf");
const bcrypt = require("bcrypt");

var userLogin = (req, res, next) => {
  req
    .check("documentNumber", "Invalid document Number")
    .isLength({ min: 8, max: 11 });
  req.check("password", "Invalid password").isLength({ min: 4, max: 20 });

  var errors = req.validationErrors();

  if (errors) {
    res.json({
      success: false,
      message: "Invalid inputs",
      errors: errors,
    });
  } else {
    console.log("passport.authenticate");
    // passport.authenticate("login", { session: false }, (err, user, info) => {
    //   console.log(user, err, info);
    //   if (err || !user) {
    //     res.json(info);
    //   } else {
    //     req.login({ _id: user._id }, { session: false }, (err) => {
    //       if (err) {
    //         res.json({
    //           success: false,
    //           message: "server error",
    //         });
    //       }

    //       var token = jwt.sign({ _id: user._id }, config.get("jwt.secret"), {
    //         expiresIn: "1d",
    //       });
    //       res.json({
    //         success: true,
    //         message: "login successful",
    //         user: {
    //           // username: user.username,
    //           type: user.usertype,
    //           _id: user._id,
    //           // email: user.email,
    //         },
    //         token: token,
    //       });
    //     });
    //   }
    // })(req, res, next);
    var documentNumber = req.body.documentNumber;
    var password = req.body.password;

    userModel.findOne({ documentnumber: documentNumber }, (err, user) => {
      console.log("localStrategyVerify", documentNumber);

      //  database server error
      if (err) {

        res.json({
          success: false,
          message: "server error", user: {
            type: user.usertype,
            _id: user._id,
          },
          token: token,
        });
      }

      // user not found
      if (!user) {

        res.json({
          success: false,
          message: "email is not registered",
        });
      } else if (user.status == false) {

        res.json({
          success: false,
          message: "your account is blocked",
        });
      } else {
        //check for password
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            res.json({
              success: true,
              message: "logged in successfully",
            });
          } else {
            res.json({
              success: false,
              message: "invalid password",
            });
          }
        });
      }
    });
  }
};

var userDetails = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    res.json({
      success: true,
      user: {
        username: req.user.username,
        type: req.user.usertype,
        _id: req.user._id,
        email: req.user.email,
      },
    });
  } else {
    res.json({
      success: false,
      user: {},
    });
  }
};

module.exports = { userLogin, userDetails };
