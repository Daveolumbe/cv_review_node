const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const ResidentSchema = mongoose.Schema({
    _id: {type: Number},
    Title: {type: String},
    FirstName: {type: String},
    LastName: {type: String},
    Email: {type: String},
    Active: {type: Number},
    MyRandomNumber: {type: Number},
    HouseHoldName: {type: String},
    Password: {type: String},
    Telephone: {type: String},
    Address: {type: String},
    Token: {type: String},
    SecurityQuestion: {type: Number},
    SecurityAnswer: {type: Number},
    SecurityA: {type: String},
    Credits: {type: Number},
    AppType: {
        Version: {type: String},
        Status: {type: String},
        ExpiryDate: {type: String}
    }
});


const ResidentModel = module.exports = mongoose.model('Users', ResidentSchema);

module.exports.getAllEstateAppUser = function(estateId, callback) {
    ResidentModel.find(estateId, callback);
};

module.exports.updateUserRecord = function(id, newData, callback) {
    ResidentModel.update(id, newData, callback);
};

module.exports.activateUser = function(id, newData, callback) {
    ResidentModel.update(id, newData, callback);
};

module.exports.countHomeOwners = function (id, callback) {
    ResidentModel.count(id, callback);
};

module.exports.deleteOne = function (id, callback) {
    ResidentModel.findOneAndRemove(id, callback);
};
