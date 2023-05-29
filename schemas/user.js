var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: false,
    // },
    documenttype: {
      type: String,
      required: false,
    },
    documentnumber: {
      type: Number,
      required: false,
      unique: false,
    },
    usertype: {
      type: String,
      enum: ["user", "administrator"],
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
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
