var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: false,
    // },
    distrito: {
      type: String,
      required: false,
    },
    fullname: {
      type: String,
      required: false,
      unique: false,
    },
    
    documenttype: {
      type: String,
      required: false,
    },
    documentnumber: {
      type: String,
      required: false,
      unique: false,
    },
    email: {
      type: String,
      unique: false,
      default: "",
    },
    mobile: {
      type: String,
      unique: false,
    },
    message: {
      type: String,
      unique: false,
    },

    // createdBy : {
    //   type : mongoose.Schema.Types.ObjectId,
    //   ref : 'adminModel'
    // }
  },
  {
    timestamps: {},
  }
);

module.exports = userSchema;
