var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

const bcrypt = require("bcrypt");
const saltRounds = 10;

var config = require("config");

var userModel = require("../models/user");

var localStrategyOption = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

function localStrategyVerify(req, email, password, done) {
  //var data = await userModel.findOne({ email: email });
  console.log("test1", email);

  userModel.findOne({ email: email }, (err, user) => {
    //  database server error
    if (err) {
      return done(err, false, {
        success: false,
        message: "server error",
      });
    }

    // user not found
    if (!user) {
      return done(null, false, {
        success: false,
        message: "email is not registered",
      });
    } else if (user.status == false) {
      return done(null, false, {
        success: false,
        message: "your account is blocked",
      });
    } else {
      //check for password
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          return done(null, user, {
            success: true,
            message: "logged in successfully",
          });
        } else {
          return done(null, false, {
            success: false,
            message: "invalid password",
          });
        }
      });
    }
  });
}

var localStrategy = new LocalStrategy(localStrategyOption, localStrategyVerify);

passport.use("login", localStrategy);

var jwt_options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

function jwtStrategyVerify(jwt_payload, done) {
  //console.log(jwt_payload);
  userModel.findById(jwt_payload._id, (err, user) => {
    //  database server error
    if (err) {
      return done(err, false, {
        success: false,
        message: "server error",
      });
    }
    if (user) {
      return done(null, user, {
        success: true,
        message: "Successful",
      });
    } else {
      return done(null, false, {
        success: false,
        message: "Authorization Failed",
      });
    }
  });
}

var jwtStrategy = new JwtStrategy(jwt_options, jwtStrategyVerify);

passport.use("user-token", jwtStrategy);

module.exports = passport;
