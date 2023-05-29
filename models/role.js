var mongoose = require('mongoose');
var roleSchema = require('../schemas/role');

var roleModel = mongoose.model('role', roleSchema);

module.exports = roleModel;