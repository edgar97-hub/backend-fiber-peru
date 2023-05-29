var mongoose = require("mongoose");

var roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    permissions : { type : Array , "default" : [] }
  },
  {
    timestamps: {},
  }
);

module.exports = roleSchema;
