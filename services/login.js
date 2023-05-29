const jwt = require("jsonwebtoken");

var config = require("config");

var passport = require("./passportconf");

var userLogin = (req, res, next) => {
  req
    .check("documentNumber", "Invalid document Number")
    .isLength({ min: 8, max: 8 });
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
    passport.authenticate("login", { session: false }, (err, user, info) => {
      console.log(user, err, info);
      if (err || !user) {
        res.json(info);
      } else {
        req.login({ _id: user._id }, { session: false }, (err) => {
          if (err) {
            res.json({
              success: false,
              message: "server error",
            });
          }

          var token = jwt.sign({ _id: user._id }, config.get("jwt.secret"), {
            expiresIn: "1d",
          });
          res.json({
            success: true,
            message: "login successful",
            user: {
              // username: user.username,
              type: user.usertype,
              _id: user._id,
              // email: user.email,
            },
            token: token,
          });
        });
      }
    })(req, res, next);
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
