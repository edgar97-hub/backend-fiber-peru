var mongoose = require("mongoose");

var companySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    business_name: {
      type: String,
      required: true,
      unique: true,
    },
    ruc_number: {
      type: String,
      required: true,
      unique: true,
    },
    ubigeo: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    landline: {
      type: String,
      required: false,
    },
    mobilePhone: {
      type: String,
      required: false,
    },
    residential_tax: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    smtp_gmail: {
      emailSender: String,
      emailSenderPass: String,
    },
    sunat_parameters: {
      environment: Number,
      sun_key_user: String,
      sun_key_user_password: String,
    },
    sunat_referral_guide: {
      client_id: String,
      client_secret: String,
    },
  },
  {
    timestamps: {},
  }
);

module.exports = companySchema;
