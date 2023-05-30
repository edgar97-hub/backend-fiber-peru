var mongoose = require('mongoose');
var inquirySchema = require('../schemas/inquiry');
var inquiryModel = mongoose.model('inquiry', inquirySchema);
module.exports = inquiryModel;