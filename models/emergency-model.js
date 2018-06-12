const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const EmergencySchema = mongoose.Schema({
    _id: {type: Number},
    UserId: {type: Number},
    Name:  {type: String},
    EstateId: {type: String},
    Status: {type: Boolean},
    Type: {type: String},
    Address: {type: String},
    TimeStamp: {type: String}
});

const UserEmergency = module.exports = mongoose.model('tblemergency', EmergencySchema, 'tblemergency');

module.exports.getAllEmergency = function (id, callback) {
    UserEmergency.find(id, callback);
};

module.exports.updateUserEmeergency = function(id, newData, callback) {
    UserEmergency.update(id, newData, callback);
};